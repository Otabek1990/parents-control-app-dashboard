

import TitleCard from '@components/core/TitleCard';

// import { useTranslation } from 'react-i18next';
import CreateUpdateMessage from './CreateUpdateMessage';

const Messages = () => {

  // const {t}=useTranslation()


  return (
    <>
      <TitleCard titleName="Messages">
        <CreateUpdateMessage  />
      </TitleCard>
     

      
  
    </>
  );
};

export default Messages;
