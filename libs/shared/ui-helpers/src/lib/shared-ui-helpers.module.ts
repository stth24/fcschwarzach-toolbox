import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmCancelModalComponent } from './confirm-cancel-modal/confirm-cancel-modal.component';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        LoaderComponent,
        ModalComponent,
        ErrorBoxComponent,
        ConfirmCancelModalComponent,
        ZoomImageComponent
    ],
    exports: [
        LoaderComponent,
        ModalComponent,
        ErrorBoxComponent,
        ConfirmCancelModalComponent,
        ZoomImageComponent
    ],
})
export class SharedUiHelpersModule { }
