import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaDetail } from './tarea-detail';

describe('TareaDetail', () => {
  let component: TareaDetail;
  let fixture: ComponentFixture<TareaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
