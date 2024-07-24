'use client'

import { supabaseClient } from '@/lib/supabase/client'
import { useQuery } from '@tanstack/react-query'

const initUser = {
  created_at: '',
  display_name: '',
  email: '',
  id: '',
  image_url: '',
}

const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = await supabaseClient()
      const { data } = await supabase.auth.getSession()

      if (data.session?.user) {
        // fetch user information profile
        const { data: user } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        return user
      }
      return initUser
    },
  })
}

export default useUser
