import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CatalogdisclaimerComponent } from './catalogdisclaimer.component'

describe('CatalogdisclaimerComponent', () => {
    let component: CatalogdisclaimerComponent
    let fixture: ComponentFixture<CatalogdisclaimerComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CatalogdisclaimerComponent]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogdisclaimerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
