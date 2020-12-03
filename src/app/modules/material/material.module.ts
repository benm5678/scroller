import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatGridListModule,
        MatIconModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatGridListModule,
        MatIconModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
    ],
    providers: []
}
)
export class MaterialModule {

}
