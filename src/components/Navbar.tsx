import ShowChartIcon from '@mui/icons-material/ShowChart';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PhoneIcon from '@mui/icons-material/Phone';
import HelpIcon from '@mui/icons-material/Help';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

const Navbar = (): React.ReactElement => {
    const buttonStyle = `flex flex-row gap-2
                         p-4
                         rounded-2xl
                         hover:bg-gray-400/70
                         cursor-pointer
                         duration-300
                         text-left`;
    return (
        <>
            <div className='flex flex-col gap-3 justify-left
                            bg-gray-300/70
                            rounded-2xl
                            p-8
                            w-64
                            text-left'>
                <button className={buttonStyle}><ShowChartIcon />Vitals</button>
                <button className={buttonStyle}><PlayCircleIcon />Media</button>
                <button className={buttonStyle}><ScheduleIcon />Schedule</button>
                <button className={buttonStyle}><PhoneIcon />Call</button>
                
                <button className={buttonStyle}><HelpIcon />Help</button>
                <button className={buttonStyle + ' text-red-500 font-bold'}><ContactEmergencyIcon />Emergency</button>
            </div>
        </>
    );
};

export default Navbar;