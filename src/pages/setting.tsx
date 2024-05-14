import Header from "../components/setting/SettingHeader";
import SetName from "../components/setting/SetName";
import SetImage from "../components/setting/SetImage";

const Setting: React.FC = () => {


  const handleSetNickName = (nickName: string) => {
    console.log(nickName);
  }

  const handleSetImage = (image: string) => {
    console.log("바뀜");
  }

  return (
    <div>
        <Header />
        <SetImage onSetImage={handleSetImage}/>
        <SetName onSetting={handleSetNickName} />
     
    </div>    
  );
};

export default Setting;
