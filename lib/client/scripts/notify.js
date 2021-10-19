"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microsoftTeams = __importStar(require("@microsoft/teams-js"));
const axios = __importStar(require("axios"));
const notifyItem = {
    id: "notify",
    title: "SEND WEEKLY HIGHLIGHTS",
    icon: null,
    viewData: null,
    enabled: true,
    selected: false
};
window.onload = function () {
    // initialize();
    showSnackBar();
    var sideNav = document.getElementById("mySidenav");
    if (!sideNav)
        return;
    sideNav.onclick = () => {
        console.log("I am clicke");
        showSnackBar();
    };
};
// // API call to share assets and notes.
function notify(requestBody) {
    return axios.default.post(`${window.location.origin}/api/notify`, requestBody);
}
function initialize() {
    // Call the initialize API first
    microsoftTeams.initialize();
    microsoftTeams.menus.setNavBarMenu([notifyItem], (id) => {
        if (id === "notify") {
            notify("");
        }
        return true;
    });
}
function showSnackBar() {
    var x = document.getElementById("msteams-snackbar");
    if (!x)
        return;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    }
    else {
        x.className = x.className.replace(" w3-show", "");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY2xpZW50L3NjcmlwdHMvbm90aWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUFzRDtBQUN0RCw2Q0FBK0I7QUFFL0IsTUFBTSxVQUFVLEdBQUc7SUFDZixFQUFFLEVBQUUsUUFBUTtJQUNaLEtBQUssRUFBRSx3QkFBd0I7SUFDL0IsSUFBSSxFQUFFLElBQUk7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLE9BQU8sRUFBRSxJQUFJO0lBQ2IsUUFBUSxFQUFFLEtBQUs7Q0FDbEIsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFDWixnQkFBZ0I7SUFDaEIsWUFBWSxFQUFFLENBQUM7SUFDZixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBbUIsQ0FBQTtJQUNwRSxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU07SUFDcEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixZQUFZLEVBQUUsQ0FBQTtJQUNsQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRix5Q0FBeUM7QUFDekMsU0FBUyxNQUFNLENBQUMsV0FBZ0I7SUFDNUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUNuQixnQ0FBZ0M7SUFDaEMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRTVCLGNBQWMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBc0QsQ0FBQyxFQUFFLENBQUMsRUFBVSxFQUFFLEVBQUU7UUFDeEcsSUFBSSxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxTQUFTLFlBQVk7SUFDakIsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBbUIsQ0FBQTtJQUNyRSxJQUFJLENBQUMsQ0FBQztRQUFFLE9BQU07SUFDZCxDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUNyQixVQUFVLENBQUMsY0FBWSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsRixDQUFDO0FBRUYsOEVBQThFO0FBQzFFLFNBQVMsT0FBTztJQUNkLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFtQixDQUFBO0lBQzVELElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDeEMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7S0FDM0I7U0FBTTtRQUNMLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ25EO0FBQ0gsQ0FBQyJ9