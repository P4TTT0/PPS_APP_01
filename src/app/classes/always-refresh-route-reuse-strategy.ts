import { RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';

export class AlwaysRefreshRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: import("@angular/router").ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: import("@angular/router").ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {}

  shouldAttach(route: import("@angular/router").ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: import("@angular/router").ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: import("@angular/router").ActivatedRouteSnapshot, curr: import("@angular/router").ActivatedRouteSnapshot): boolean {
    return false;
  }
}
