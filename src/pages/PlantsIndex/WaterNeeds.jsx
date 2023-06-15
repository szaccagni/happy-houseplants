import Tooltip from '@mui/material/Tooltip';

export default function WaterNeeds({needs}) {
    const toolTipText = `${needs} Watering Needed`
    return (
        <Tooltip title={toolTipText} placement="right">
        <div className="water-needs">
            {needs === 'Minimum' &&
            <>
                <img src='/raindrop-blue.png' style={{width: '24px'}}></img>
                <img src='/raindrop-white.png' style={{width: '24px'}}></img>
                <img src='/raindrop-white.png' style={{width: '24px'}}></img>
            </>
            }
            {needs === 'Average' &&
            <>
                <img src='/raindrop-blue.png' style={{width: '24px'}}></img>
                <img src='/raindrop-blue.png' style={{width: '24px'}}></img>
                <img src='/raindrop-white.png' style={{width: '24px'}}></img>
            </>
            }
            {needs === 'Frequent' &&
            <>
                <img src='/raindrop-blue.png' style={{width: '24px'}}></img>
                <img src='/raindrop-blue.png' style={{width: '24px'}}></img>
                <img src='/raindrop-blue.png' style={{width: '24px'}}></img>
            </>
            }
        </div>
        </Tooltip>   
    )
}