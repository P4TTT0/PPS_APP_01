import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPhotosPage } from './list-photos.page';

describe('ListPhotosPage', () => {
  let component: ListPhotosPage;
  let fixture: ComponentFixture<ListPhotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
