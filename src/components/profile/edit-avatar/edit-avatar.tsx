// import { ComponentPropsWithoutRef, useState } from 'react'
// import Avatar from 'react-avatar-edit'
//
// import { Button } from '@/components/ui/button'
// import { UpdateUser } from '@/services/auth'
//
// import s from './edit-avatar.module.scss'
// import {profilePageData} from "@/assets/variable";
//
// type Props = {
//   handleCancelEdit: () => void
//   handleUpdateUser: (formData: UpdateUser) => void
// } & ComponentPropsWithoutRef<'div'>
//
// export const EditAvatar = ({ handleCancelEdit, handleUpdateUser }: Props) => {
//   const [imgCrop, setImgCrop] = useState<null | string>(null)
//     const { button } = profilePageData.profile.editAvatar
//
//   const onClose = () => {
//     setImgCrop(null)
//   }
//
//   const onCrop = (preview: string) => {
//     setImgCrop(preview)
//   }
//
//   const convertBase64ToFile = async (url: string) => {
//       console.log(url)
//     const type = url.split(';')[0].split('/')[1]
//
//     return fetch(url)
//       .then(res => res.blob())
//       .then(blob => {
//         return new File([blob], `File.${type}`, { type: `image/${type}` })
//       })
//   }
//
//   const saveImg = async () => {
//     let avatar
//
//     if (imgCrop) {
//       avatar = await convertBase64ToFile(imgCrop)
//         console.log(avatar)
//       handleUpdateUser({ avatar: avatar })
//     }
//     handleCancelEdit()
//   }
//
//   return (
//     <div className={s.AvatarRoot}>
//       <div className={s.AvatarWrapper}>
//         <Avatar
//           cropRadius={50}
//           height={161}
//           labelStyle={{
//             color: 'var(--color-accent-500)',
//             fontFamily: 'var(--font-family-primary)',
//             fontSize: 'var(--font-size-s)',
//             fontWeight: 'var(--font-weight-bold)',
//           }}
//           onClose={onClose}
//           onCrop={onCrop}
//           width={161}
//         />
//       </div>
//       <Button className={s.AvatarButton} fullWidth onClick={saveImg}>
//           {button}
//       </Button>
//     </div>
//   )
// }

import {ComponentPropsWithoutRef, useState} from 'react'
import { Button } from '@/components/ui/button'
import s from './edit-avatar.module.scss'
import Avatar from "react-avatar-edit";
import {UpdateUser} from "@/services/auth";

type Props = {
    handleCancelEdit: () => void
    handleUpdateUser: (formData: UpdateUser) => void
} & ComponentPropsWithoutRef<'div'>

export const EditAvatar = ({ handleCancelEdit, handleUpdateUser}: Props) => {
    const [imgCrop, setImgCrop] = useState<null | string>(null)

    const onClose = () => {
        setImgCrop(null)
    }

    const onCrop = (preview: string) => {
        setImgCrop(preview)
    }

    const convertBase64ToFile = async (url: string) => {
        const type = url.split(';')[0].split('/')[1];
        return fetch(url)
            .then(res => res.blob())
            .then(blob => {
                return new File([blob], `File.${type}`, {type: `image/${type}`})
            })
    }

    const saveImg = async () => {
        let avatar;
        if (imgCrop) {
            avatar = await convertBase64ToFile(imgCrop)
            handleUpdateUser({avatar: avatar})
        }
        handleCancelEdit()

    }

    return (

        <div className={s.AvatarRoot}>
            <div className={s.AvatarWrapper}>
                <Avatar
                    labelStyle={{fontFamily: 'var(--font-family-primary)', fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent-500)'}}
                    width={161}
                    height={161}
                    cropRadius={50}
                    onCrop={onCrop}
                    onClose={onClose}
                />
            </div>
            <Button className={s.AvatarButton} fullWidth onClick={saveImg}>Save Changes</Button>
        </div>
    )
}
