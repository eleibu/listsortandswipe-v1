export function hasDomainForm(value) {
	if (/^\S+\.\S+$/.test(value)) {
		return true;
	}
	return false;
}

export function stripUrl(url) {
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

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}

export function trimString(text) {
    return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}