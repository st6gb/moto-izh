import { ComponentPortal, ComponentType, DomPortalOutlet } from "@angular/cdk/portal";
import { DOCUMENT } from "@angular/common";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CdkPortalDomService {
  private bodyPortalOutlet: DomPortalOutlet;
  private queueComponent: ComponentPortal<any>[] = [];
  constructor(
    @Inject(DOCUMENT) document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef
    ) {
      this.bodyPortalOutlet = new DomPortalOutlet(
        document.body,
        componentFactoryResolver,
        applicationRef,
        injector
      );
  }

  public attachComponent(component: ComponentType<any>, componentProps: object = {}): any {
    const componentPortal = new ComponentPortal<any>(component);
    const componentRef = this.bodyPortalOutlet.attach(componentPortal);
    if (typeof componentRef.instance === 'object') {
      Object.assign(componentRef.instance, componentProps);
    }
    this.queueComponent.push(componentPortal);
    return componentRef.instance;
  }

  public appendComponent<T>(component: ComponentType<T>, componentProps: object = {}): any {
    this.bodyPortalOutlet.detach();
    this.attachComponent(component, componentProps);
  }

  public backFromQueue() {
    this.queueComponent.pop();
    const componentRef = this.queueComponent.pop();
    this.bodyPortalOutlet.detach();
    this.bodyPortalOutlet.attach(componentRef);
  }

  public removeComponent(): void {
    this.bodyPortalOutlet.detach();
  }
}
