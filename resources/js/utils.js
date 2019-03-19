export function encodeHTML(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function findIndexById(array, id) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].id == id) {
        	return i;
        }
    }
    return null;
}

export function hasDomainForm(value) {
	// note: changes should also be reflected in the equivalent php function

	if (/^\S+\.\S+$/.test(value)) {
		return true;
	}
	return false;
}

export function stripUrl(url) {
	// note: changes should also be reflected in the equivalent php function

	url = url.toLowerCase();

	url = url.replace(/^http:\/\/|https:\/\/|ftp:\/\/|ftps:\/\//, '');
	url = url.replace(/^www\./, '');

	var iColon = url.indexOf(':');
	var iSlash = -1;
	if (iColon > -1) {
		url = url.substring(0, iColon);
	} else {
		iSlash = url.indexOf('/');
		if (iSlash > -1) {
			url = url.substring(0, iSlash);
		}
	}

	if (iColon == -1 && iSlash == -1) {
		var iQuery = url.indexOf('?');
		if (iQuery > -1) {
			url = url.substring(0, iQuery);
		}
	}

	if (iColon == -1 && iSlash == -1) {
		var iHash = url.indexOf('#');
		if (iHash > -1) {
			url = url.substring(0, iHash);
		}
	}

	return url;
}

export function requestObjCreate(cancelToken) {
    const requestObj = {
        id: uuidv4(),
        source: cancelToken.source()
    };
    return requestObj;
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}

export function trimString(text) {
    return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export function arrayMove(arr, previousIndex, newIndex) {
    const array = arr.slice(0);
    if (newIndex >= array.length) {
        let k = newIndex - array.length;
        while (k-- + 1) {
            array.push(undefined);
        }
    }
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
    return array;
}