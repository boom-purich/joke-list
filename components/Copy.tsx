import { useState } from 'react';
import styles from '@styles/Copy.module.scss';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from '@models/joke.model';

const CopyComponent = ({ copy_text, class_name }: Copy) => {

    const [openCopyStatus, setOpenCopyStatus] = useState<boolean>(false);

    const handleCopyText = (text: string, result: boolean) => {
        result && setOpenCopyStatus(true);
    }

    const handleCloseCopyStatus = () => {
        setOpenCopyStatus(false);
    }

    return (
        <>
            <CopyToClipboard text={copy_text} onCopy={handleCopyText}>
                <Tooltip title="Copy" placement="bottom" arrow>
                    <button className={styles[`${class_name}`]}><i className="far fa-copy"></i></button>
                </Tooltip>
            </CopyToClipboard>
            <Snackbar
                open={openCopyStatus}
                onClose={handleCloseCopyStatus}
                transitionDuration={{ enter: 300, exit: 300 }}
                autoHideDuration={1500}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                className={styles.copy_snackbar_container}
            >
                <div className={styles.copy_snackbar_content}>Copied your joke. Enjoy</div>
            </Snackbar>
        </>
    );
}

export default CopyComponent;
