import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-catalogdisclaimer',
    templateUrl: './catalogdisclaimer.component.html',
    styleUrls: ['./catalogdisclaimer.component.css']
})
export class CatalogdisclaimerComponent {
    @Output() hide_message = new EventEmitter<boolean>()

    onHide() {
        this.hide_message.emit(true)
    }
}
