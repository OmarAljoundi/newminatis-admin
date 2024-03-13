import { useState } from 'react'
import UserService from 'service/UserService'
import { SearchQuery } from 'types/TSearchQuery'
import { TUser } from 'types/TUser'

const useUserService = () => {
    const [userLoad, setUserLoad] = useState(false)

    const onAuthByEmail = (data: TUser) => {
        setUserLoad(true)
        return new Promise((resolve, reject) => {
            UserService.authByEmail(data)
                .then((res) => {
                    setUserLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setUserLoad(false)
                    reject(err)
                })
        })
    }

    const onSearchUsers = (search: SearchQuery) => {
        setUserLoad(true)
        return new Promise((resolve, reject) => {
            UserService.lookUpUsers(search)
                .then((res) => {
                    setUserLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setUserLoad(false)
                    reject(err)
                })
        })
    }

    return {
        onAuthByEmail,
        onSearchUsers,
        userLoad,
    }
}

export default useUserService
