import Tooltip from '@mui/material/Tooltip';

export default function SunNeeds({needs}) {
    const toolTipText = `${needs} Needed`

    return (
        <Tooltip title={toolTipText} placement="right">
        <div className="water-needs">
            {needs === 'Sun' &&
            <>
                <img src='/sun-orange.png' style={{width: '36px', padding: '0 2px'}}></img>
            </>
            }
            {needs.toLowerCase().includes('full sun') &&
            <>
                <img src='/sun-orange.png' style={{width: '36px', padding: '0 2px'}}></img>
            </>
            }
            {needs.toLowerCase().includes('part sun') &&
            <>
                <img src='/sun-orange.png' style={{width: '36px', padding: '0 2px'}}></img>
            </>
            }
            {needs.toLowerCase().includes('part shade') &&
            <>
                <img src='/sun-white.png' style={{width: '36px', padding: '0 2px'}}></img>
            </>
            }
            {needs.toLowerCase().includes('full shade') &&
            <>
                <img src='/cloud.png' style={{width: '36px', padding: '0 2px'}}></img>
            </>
            }
        </div>
        </Tooltip>
    )
}