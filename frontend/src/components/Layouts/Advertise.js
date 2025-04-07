import { Paper } from '@mui/material';
import './style.css'
const AdvertiserService=(props)=>{
    const {numberOfAdvertisers} = props;
    console.log(numberOfAdvertisers)
    const advertisementData=[{name:'ad1'},{name:'ad2'},{name:'ad3'}]
    return (
        <Paper className="advertise">
            {
                numberOfAdvertisers ?
                <div>
                    {advertisementData.map((ad,i)=><div key={i}>{ad.name}</div>)}
                </div>
            :
            <div>
                <h1>Advertise</h1>
                <span>span content</span>
            </div>            }
            

        </Paper>
    )
}

export default AdvertiserService;