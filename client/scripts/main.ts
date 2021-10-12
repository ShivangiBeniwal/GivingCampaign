import * as microsoftTeams from '@microsoft/teams-js';
import * as axios from 'axios';

function initialize() {
  console.log("cliked");
  var btn = document.getElementById("testbutton") as HTMLButtonElement
  btn.onclick = () => {
      console.log("cyan")
      notify("HI I AM NOTIFICATION")
      var x = document.getElementById("testdiv") as HTMLDivElement
      if (x.style.display === "none") {
        x.style.display = "block";
        console.log("yellow")
      } else {
        x.style.display = "none";
      }
  }
}

// // API call to share assets and notes.
function notify(note: any) {
    return axios.default.post(`${window.location.origin}/api/notify`, note);
}

window.onload = function() {
    initialize();
}

    // Call the initialize API first
    microsoftTeams.initialize();

    // // Check the initial theme user chose and respect it
    // microsoftTeams.getContext(function (context) {
    //     if (context && context.theme) {
    //         setTheme(context.theme);
    //     }
    // });

    // // Handle theme changes
    // microsoftTeams.registerOnThemeChangeHandler(function (theme) {
    //     setTheme(theme);
    // });

    // // Save configuration changes
    // microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
    //     // Let the Microsoft Teams platform know what you want to load based on
    //     // what the user configured on this page
    //     microsoftTeams.settings.setSettings({
    //         contentUrl: createTabUrl(), // Mandatory parameter
    //         entityId: createTabUrl(), // Mandatory parameter
    //     });

    //     // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
    //     // for the app to call this API before it dismisses the dialog. If the wait times out, you will
    //     // see an error indicating that the configuration settings could not be saved.
    //     saveEvent.notifySuccess();
    // });

    // // Logic to let the user configure what they want to see in the tab being loaded
    // document.addEventListener('DOMContentLoaded', function () {
    //     var tabChoice = document.getElementById('tabChoice');
    //     if (tabChoice) {
    //         tabChoice.onchange = function () {
    //             var selectedTab = tabChoice.options[tabChoice.selectedIndex].value;

    //             // This API tells Microsoft Teams to enable the 'Save' button. Since Microsoft Teams always assumes
    //             // an initial invalid state, without this call the 'Save' button will never be enabled.
    //             microsoftTeams.settings.setValidityState(
    //                 selectedTab === 'first' || selectedTab === 'second'
    //             );
    //         };
    //     }
    // });

    // // Set the desired theme
    // function setTheme(theme) {
    //     if (theme) {
    //         // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
    //         document.body.className =
    //             'theme-' + (theme === 'default' ? 'light' : theme);
    //     }
    // }

    // // Create the URL that Microsoft Teams will load in the tab. You can compose any URL even with query strings.
    // function createTabUrl() {
    //     var tabChoice = document.getElementById('tabChoice');
    //     var selectedTab = tabChoice.options[tabChoice.selectedIndex].value;

    //     return (
    //         window.location.protocol +
    //         '//' +
    //         window.location.host +
    //         '/' +
    //         selectedTab
    //     );
    // }