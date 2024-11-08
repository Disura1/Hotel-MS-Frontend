function UserTag(props) {
  return (
    <div className="flex items-center cursor-pointer border-l-4 border-dotted border-c4">
      <img src={props.imageLink} className="w-[40px] rounded-[30%] ml-2 mr-2"/>
      <span className="text-c4 text-lg">{props.name}</span>
    </div>
  );
}

export default UserTag;
