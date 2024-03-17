import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmCancelModalComponent } from './confirm-cancel-modal/confirm-cancel-modal.component';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { SafeHtmlPipe } from './safe-html-pipe/safe-html.pipe';
import { WeekdayPipe } from './weekday-pipe/weekday.pipe';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        LoaderComponent,
        ModalComponent,
        ErrorBoxComponent,
        ConfirmCancelModalComponent,
        ZoomImageComponent,
        SafeHtmlPipe,
        WeekdayPipe
    ],
    exports: [
        LoaderComponent,
        ModalComponent,
        ErrorBoxComponent,
        ConfirmCancelModalComponent,
        ZoomImageComponent,
        SafeHtmlPipe,
        WeekdayPipe
    ],
})
export class SharedUiHelpersModule { }
