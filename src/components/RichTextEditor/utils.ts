export const detectFileType = (urlOrFile) => {
    if (!urlOrFile || (typeof urlOrFile === 'string' && urlOrFile?.length === 0)) {
        return 'Unknown';
    }
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg'];
    const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'];
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+&v=)|youtu\.be\/)[^&?/]+/;

    let extension = '';

    if (typeof urlOrFile === 'string') {
        const url = new URL(urlOrFile);
        if (youtubeRegex.test(urlOrFile)) {
            console.log("for youtube")
            return 'video';
        }
        extension = url.pathname.split('.').pop().toLowerCase();
    } else if (urlOrFile instanceof File) {
        const fileType = urlOrFile.type;
        if (fileType.startsWith('image/')) {
            return 'image';
        } else if (fileType.startsWith('video/')) {
            return 'video';
        } else if (fileType.startsWith('audio/')) {
            return 'audio';
        }else if (fileType.startsWith('application/pdf')){
            return 'pdf';
        }else if (fileType.startsWith('application/msword') || fileType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')){
            return 'doc';
        }else if (fileType.startsWith('text/plain')){
            return 'text';
        }
        extension = urlOrFile.name.split('.').pop().toLowerCase();
    } else {
        return 'Unknown';
    }

    if (imageExtensions.includes(extension)) {
        return 'image';
    } else if (videoExtensions.includes(extension)) {
        return 'video';
    } else if (audioExtensions.includes(extension)) {
        return 'audio';
    } else {
        return 'Unknown';
    }
}
export const getFileName = (urlOrFile) => {
    if(urlOrFile instanceof File){
        let fileName = urlOrFile?.name;
        return fileName;
    }
}
export const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const getCaretPosition = (editorState) => {
    return editorState.getSelection().getAnchorOffset()
}

export const getText = (editorState, start, end) => {
    const block = getCurrentBlock(editorState)
    const blockText = block.getText()
    return blockText.substring(start, end)
}

export const getCurrentBlock = editorState => {
    if (editorState.getSelection) {
        const selectionState = editorState.getSelection()
        const contentState = editorState.getCurrentContent()
        const block = contentState.getBlockForKey(selectionState.getStartKey())
        return block
    }
}
export const getRandomKey = () => {
	let randomKey = Math.random().toString(36).slice(2);
	if (randomKey[0] >= "0" && randomKey[0] <= "9") {
		let charcode = "a".charCodeAt(0);
		charcode = charcode + Number(randomKey[0]);
		randomKey = String.fromCharCode(charcode) + randomKey.substring(1);
	}
	return randomKey;
}

export const isValidURL = (url: any) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}