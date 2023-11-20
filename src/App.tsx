import {UserDropdown} from "@/components/ui/dropdown-menu/userDropdown";
import {IconLearn} from "@/components/ui/dropdown-menu/assets/IconLearn";
import {IconEdit} from "@/components/ui/dropdown-menu/assets/IconEdit";
import IconDelete from "@/components/ui/dropdown-menu/assets/IconDelete";

export function App() {
  return <div style={{
    marginLeft: 150
  }}>

    <UserDropdown trigger={<div
      style={{
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
    />} items={[
      {
        icon: <IconLearn/>, description: 'Learn', callback: () => {
        }
      },
      {
        icon: <IconEdit/>, description: 'Edit', callback: () => {
        }
      },
      {
        icon: <IconDelete/>, description: 'Delete', callback: () => {
        }
      }
    ]}
                  profile={
      {
        name: "User",
        email: 'user@mail.ru',
        imageUrl: 'https://i.pinimg.com/736x/19/63/b2/1963b290b9856d479b432734029ff2ee.jpg',
      }}
    />

  </div>
}
