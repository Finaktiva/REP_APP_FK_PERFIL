import { Routes } from '@angular/router';
import { GeneralInformationComponent } from './features/general-information/general-information.component';
import { NotificationComponent } from './features/notification/notification.component';

export const routes: Routes = [
    {
        path: "profile",
        component: GeneralInformationComponent
    },
    {
        path: "profile/notifications",
        component: NotificationComponent
    }
];
