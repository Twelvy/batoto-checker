document.addEventListener('DOMContentLoaded', loadSettings, false);

function saveSettings()
{
	var select = document.getElementById("update_time");
	var updateTime = select.value;
	
	localStorage['time'] = updateTime;
	localStorage['en'] = document.getElementById("en").checked;
	localStorage['fr'] = document.getElementById("fr").checked;
	localStorage['es'] = document.getElementById("es").checked;
	localStorage['pt'] = document.getElementById("pt").checked;
	localStorage['it'] = document.getElementById("it").checked;
	localStorage['de'] = document.getElementById("de").checked;
	localStorage['ru'] = document.getElementById("ru").checked;
	localStorage['tr'] = document.getElementById("tr").checked;
	localStorage['ar'] = document.getElementById("ar").checked;

	var bgPage = chrome.extension.getBackgroundPage();
	bgPage.settingsChanged();
}

function loadSettings()
{
	// add onClick event on the save button
	document.getElementById("saveButton").onclick = saveSettings;
	
	var updateTime = localStorage['time'];
	var select = document.getElementById("update_time");
	for (var i = 0; i < select.children.length; i++)
	{
		var child = select.children[i];
		if (child.value == updateTime)
		{
			child.selected = "true";
			break;
		}
	}

	document.getElementById("en").checked = localStorage['en'] == "true";
	document.getElementById("fr").checked = localStorage['fr'] == "true";
	document.getElementById("es").checked = localStorage['es'] == "true";
	document.getElementById("pt").checked = localStorage['pt'] == "true";
	document.getElementById("it").checked = localStorage['it'] == "true";
	document.getElementById("de").checked = localStorage['de'] == "true";
	document.getElementById("ru").checked = localStorage['ru'] == "true";
	document.getElementById("tr").checked = localStorage['tr'] == "true";
	document.getElementById("ar").checked = localStorage['ar'] == "true";
	
	/*var notify = localStorage["dAchecker_notif"];
	if (notify != 0)
	{
		document.notif.radioNotif[0].checked = true;
	}
	else
	{
		document.notif.radioNotif[1].checked = true;
	}*/
}