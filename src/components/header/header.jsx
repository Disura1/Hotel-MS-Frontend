import UserTag from "../userData/userData";

function Header() {
  return (
    <header className="fixed z-10 w-full bg-c2 flex justify-between p-[10px] items-center">
      <h1 className="text-[30px] font-bold text-c4 cursor-pointer">Hotel Management System</h1>
      <UserTag
        imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeatcmYRYsMNho5mAp9qySUzghxQYU_TPGw&s"
        name="User Name"
      />
    </header>
  );
}

export default Header;
