import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingalTest } from './singal-test';

describe('SingalTest', () => {
  let component: SingalTest;
  let fixture: ComponentFixture<SingalTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingalTest],
    }).compileComponents();

    fixture = TestBed.createComponent(SingalTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
