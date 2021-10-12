function getTabs()
{
    chrome.tabs.query({currentWindow: true, active: true}, doThingWithTabs);
}

function doThingWithTabs(tabs)
{
    let fullUrl = tabs[0].url;
    if (isValidUrl(fullUrl))
    {
        let githubNumber = getGithubNumberFromUrl(fullUrl);
        let searchUrl = createAdoSearchUrl(githubNumber);
        
        // Create link with search URL
        document.getElementById("content").innerHTML = 
            "<a href='" + searchUrl + "' "
            + "target='_blank' rel='noopener' " // Opens link in new tab
            + "title='Open ADO link in new tab'>Link</a>";
    }
    else
    {
        //document.write("Not a WinUI GitHub page");
        document.getElementById("content").innerHTML = "Not a WinUI GitHub page";
    }
}

function isValidUrl(fullUrl)
{
    let firstPart = "https://github.com/microsoft/microsoft-ui-xaml/issues/";
    let isValid = (fullUrl.startsWith(firstPart)) ? true : false;
    return isValid;
}

function getGithubNumberFromUrl(fullUrl)
{
    let number;
    let firstPart = "https://github.com/microsoft/microsoft-ui-xaml/issues/";
    let len = firstPart.length;
    number = fullUrl.substring(len);
    return number;
}

function createAdoSearchUrl(githubNumber)
{
    let urlStart = "https://microsoft.visualstudio.com/OS/_search?";
    let searchTest = "text=https%3A//github.com/microsoft/microsoft-ui-xaml/issues/";
    // github item number goes here
    let itemType = "&type=workitem&lp=workitems-Project";
    let searchUrl = urlStart + searchTest + githubNumber + itemType;
    return searchUrl;
}

document.getElementById("linkButton").addEventListener("click", getTabs);