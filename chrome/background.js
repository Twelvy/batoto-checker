var batotoURL = "http://www.batoto.net/";
var divContainer = null;
var updater;

// click on icon
chrome.browserAction.onClicked.addListener(commandClick);

// timer
settingsChanged();

backgroundPageLoad();

function settingsChanged()
{
	var updateTime = parseInt(localStorage['time']);
	if (!updateTime)
	{
		updateTime = 300000;
	}
	updater = window.setInterval(backgroundPageLoad, updateTime);
}

function backgroundPageLoad()
{
	$.ajax({
		url: batotoURL,
		success: checkNewManga
	});
}

function checkNewManga(data)
{
	initDiv();
			
	divContainer.innerHTML = data;
	var follows = document.getElementById("tab_content_forums").children[0];
	
	var relevantData = new Array();
	
	for (var i = 0; i < follows.children.length; ++i)
	{
		var liObject = follows.children[i];
		
		var title = liObject.children[0].text;
		var language = liObject.children[2].title;
		var chapter = liObject.children[3].innerText;
		var time = liObject.children[4].innerText;
		
		if (checkLanguage(language))
		{
			var dataStruct = { mangaTitle: title, lastChapter: chapter, lang: language, upTime: time };
			relevantData.push(dataStruct);
		}
	}
	
	if (relevantData.length > 0)
	{
		var tooltip = "Batoto new mangas";
		
		for (var i = 0; i < relevantData.length; ++i)
		{
			tooltip += "\n" + relevantData[i].mangaTitle + " (" + relevantData[i].lastChapter + ")";
		}
		
		chrome.browserAction.setBadgeText({text:String(relevantData.length)});
		chrome.browserAction.setTitle({title:tooltip});
	}
	else
	{
		chrome.browserAction.setBadgeText({text:""});
	}
	
	divContainer.innerHTML = "";
}

function initDiv()
{
	if (divContainer == null)
	{
		divContainer = document.createElement('div');
		document.body.insertBefore(divContainer, null);
	}
}

function checkLanguage(language)
{
	if (language == "English")
	{
		return localStorage['en'] == "true";
	}
	else if (language == "French")
	{
		return localStorage['fr'] == "true";
	}
	else if (language == "Spanish")
	{
		return localStorage['es'] == "true";
	}
	else if (language == "Portuguese")
	{
		return localStorage['pt'] == "true";
	}
	else if (language == "Italian")
	{
		return localStorage['it'] == "true";
	}
	else if (language == "Russian")
	{
		return localStorage['ru'] == "true";
	}
	else if (language == "Arabic")
	{
		return localStorage['ar'] == "true";
	}
	else if (language == "German")
	{
		return localStorage['de'] == "true";
	}
	else if (language == "Turkish")
	{
		return localStorage['tr'] == "true";
	}
	else
	{
		return false;
	}
}

function commandClick(tab)
{
	backgroundPageLoad();
	var createTab = true;
	chrome.tabs.getAllInWindow(null, function(tabs){
		for ( tabId in tabs )
		{
			if (tabs[tabId].url && tabs[tabId].url.indexOf(batotoURL) == 0)
			{
				chrome.tabs.update(tabs[tabId].id, {selected:true});
				createTab = false;
			}
		}
		
		if (createTab)
		{
			chrome.tabs.create({url:batotoURL});
		}
	});
}