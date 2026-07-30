import { TestBed } from "@angular/core/testing";

import { App } from './app.component'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should map OldUser to User correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const oldUser = {
      idn: 1,
      names: 'Alice',
      emails: 'alice@example.com',
      passwords: 'secret',
      roles: 'admin',
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-02T00:00:00Z'
    } as any;

    const user = app.mapOldUserToUser(oldUser);

    expect(user.id).toBe(1);
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.password).toBe('secret');
    expect(user.role).toBe('admin');
    expect(user.createdAt instanceof Date).toBe(true);
    expect(user.updatedAt instanceof Date).toBe(true);
    expect(user.createdAt.toISOString()).toBe(new Date('2020-01-01T00:00:00Z').toISOString());
  });
});
