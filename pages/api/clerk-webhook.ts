import { createClient } from '@supabase/supabase-js'
import { WebhookEvent } from '@clerk/nextjs/server'
import { buffer } from 'micro'
import { NextApiRequest, NextApiResponse } from 'next'
import { Webhook } from 'svix'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  // Verify the webhook signature
  const rawBody = await buffer(req)
  const signature = req.headers['svix-signature'] as string
  const svix_id = req.headers['svix-id'] as string
  const timestamp = req.headers['svix-timestamp'] as string

  if (!signature || !svix_id || !timestamp) {
    return res.status(400).json({ error: 'Missing svix headers' })
  }

  let evt: WebhookEvent

  // Verify the webhook signature
  // You can find the webhook secret in the Clerk Dashboard
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!
  
  try {
    const wh = new Webhook(WEBHOOK_SECRET)
    evt = wh.verify(rawBody.toString(), {
      'svix-id': svix_id,
      'svix-timestamp': timestamp,
      'svix-signature': signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  // Handle the webhook
  const eventType = evt.type
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, username, first_name, last_name } = evt.data

    const { data, error } = await supabase
      .from('users')
      .upsert({
        clerk_id: id,
        email: email_addresses[0]?.email_address,
        username: username,
        first_name: first_name,
        last_name: last_name,
      }, {
        onConflict: 'clerk_id'
      })

    if (error) {
      console.error('Error inserting user into Supabase:', error)
      return res.status(500).json({ error: 'Error inserting user' })
    }
  }
  res.status(200).json({ message: 'Webhook processed successfully' })
}
