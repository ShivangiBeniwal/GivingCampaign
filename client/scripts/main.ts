import * as microsoftTeams from '@microsoft/teams-js';
import * as axios from 'axios';

var currentUpn: string = "null"


const notifyItem = {
    id: "notify",
    title: "Notify",
    icon: null,
    viewData: null,
    enabled: true,
    selected: false
}

function initialize() {
//     console.log("cliked");
//     var abtn = document.getElementById("authbutton") as HTMLButtonElement
//     if (abtn) {
//         abtn.onclick = () => {
//             getAuthToken()
//          }
//     }

//   var btn = document.getElementById("testbutton") as HTMLButtonElement
//     if (btn) {
//         btn.onclick = () => {
//             console.log("cyan" + currentUpn)
//             notify({ key: currentUpn, message: 'HI I AM NOTIFICATION' })
//             var x = document.getElementById("testdiv") as HTMLDivElement
//             if (x.style.display === "none") {
//                 x.style.display = "block";
//                 console.log("yellow")
//             } else {
//                 x.style.display = "none";
//             }
//         }
//   }

  console.log("before snackbar");
  showSnackBar();
  console.log("after snackbar");
  var sideNav = document.getElementById("mySidenav") as HTMLDivElement
  if (!sideNav) return
  sideNav.onclick = () => {
      console.log("I am clicke");
      notify("")
  }
}

function getAuthToken() {
    var authTokenRequest = {
      successCallback: (result: string) => {
        console.log("Token received: " + result)
      },
      failureCallback: function(error: string) {
        console.log("Error getting token: " + error)
      }
    }

    console.log("Get Auth Token Call is made.")
    microsoftTeams.authentication.getAuthToken(authTokenRequest)
  }

// // API call to share assets and notes.
function notify(requestBody: any) {
    return axios.default.post(`${window.location.origin}/api/notify`, requestBody);
}

// Call the initialize API first
microsoftTeams.initialize();

window.onload = function () {

    initialize();

    microsoftTeams.menus.setNavBarMenu([notifyItem as unknown as microsoftTeams.menus.MenuItem], (id: string) => {
        if (id === "notify") {
            notify("")
        }
        return true;
      })

}

function showSnackBar() {
    var x = document.getElementById("msteams-snackbar") as HTMLDivElement
    if (!x) return
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 }

// Used to toggle the menu on smaller screens when clicking on the menu button
    function openNav() {
      var x = document.getElementById("navDemo") as HTMLDivElement
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }

    // Check the initial theme user chose and respect it
    microsoftTeams.getContext(function (context: microsoftTeams.Context) {
      if (context.userPrincipalName === undefined) return
      currentUpn = context.userPrincipalName
      if (context && context.theme) {
          setTheme(context.theme);
      }
    });

    // Handle theme changes
    microsoftTeams.registerOnThemeChangeHandler(function (theme) {
        setTheme(theme);
    });

    // Save configuration changes
    microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
        // Let the Microsoft Teams platform know what you want to load based on
        // what the user configured on this page
        microsoftTeams.settings.setSettings({
            contentUrl: createTabUrl(), // Mandatory parameter
            entityId: createTabUrl(), // Mandatory parameter
        });

        // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
        // for the app to call this API before it dismisses the dialog. If the wait times out, you will
        // see an error indicating that the configuration settings could not be saved.
        saveEvent.notifySuccess();
    });

    // Logic to let the user configure what they want to see in the tab being loaded
    document.addEventListener('DOMContentLoaded', function () {
        var tabChoice = document.getElementById('tabChoice') as HTMLSelectElement
        if (tabChoice) {
            tabChoice.onchange = function () {
                var selectedTab = tabChoice.options[tabChoice.selectedIndex].value;

                // This API tells Microsoft Teams to enable the 'Save' button. Since Microsoft Teams always assumes
                // an initial invalid state, without this call the 'Save' button will never be enabled.
                microsoftTeams.settings.setValidityState(
                    selectedTab === 'first' || selectedTab === 'second'
                );
            };
        }
    });

    // Set the desired theme
    function setTheme(theme: string) {
        if (theme) {
            // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
            document.body.className =
                'theme-' + (theme === 'default' ? 'light' : theme);
        }
    }

    // Create the URL that Microsoft Teams will load in the tab. You can compose any URL even with query strings.
    function createTabUrl() {
        var tabChoice = document.getElementById('tabChoice') as HTMLSelectElement
        var selectedTab = tabChoice.options[tabChoice.selectedIndex].value;

        return (
            window.location.protocol +
            '//' +
            window.location.host +
            '/' +
            selectedTab
        );
    }