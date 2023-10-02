import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUglyPhotosPage } from './list-ugly-photos.page';

describe('ListUglyPhotosPage', () => {
  let component: ListUglyPhotosPage;
  let fixture: ComponentFixture<ListUglyPhotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListUglyPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
