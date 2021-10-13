window.onload = (event) => {
    // Gets the current tabs
    chrome.tabs.query({currentWindow: true, active: true}, getAdoLink);
};

function getAdoLink(tabs)
{
    // Check the URL of the current tab to see if it's a MUX GitHub URL
    let fullUrl = tabs[0].url;
    if (isValidUrl(fullUrl))
    {
        let githubNumber = getGithubNumberFromUrl(fullUrl);
        let searchUrl = createAdoSearchUrl(githubNumber);
        
        // Create link with search URL
        document.getElementById("content").innerHTML = 
            "<a href='" + searchUrl + "' "
            + "target='_blank' rel='noopener' "   // Opens link in new tab
            + "title='Open ADO link in new tab' " // Hover text
            + ">ADO Link</a>";                    // Display text
    }
    else
    {
        document.getElementById("content").innerHTML = "Not a WinUI GitHub page";
    }
}

function isValidUrl(fullUrl)
{
    // Leave out ending slash so the full list of issues (no number) is considered valid
    let firstPart = "https://github.com/microsoft/microsoft-ui-xaml/issues";
    return fullUrl.startsWith(firstPart);
}

function getGithubNumberFromUrl(fullUrl)
{
    let firstPart = "https://github.com/microsoft/microsoft-ui-xaml/issues/";
    return fullUrl.substring(firstPart.length);
}

function createAdoSearchUrl(githubNumber)
{
    let urlStart = "https://microsoft.visualstudio.com/OS/_search?";
    let searchText = "text=https%3A//github.com/microsoft/microsoft-ui-xaml/issues/";
    // github item number goes here (if there is one, otherwise we return a query for all the MUX GitHub issues)
    let itemType = "&type=workitem&lp=workitems-Project";
    let searchUrl = urlStart + searchText + githubNumber + itemType;
    return searchUrl;
}
