'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">restaurant-web-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-af001c965095e109703b51fba612ef0b"' : 'data-target="#xs-components-links-module-AppModule-af001c965095e109703b51fba612ef0b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-af001c965095e109703b51fba612ef0b"' :
                                            'id="xs-components-links-module-AppModule-af001c965095e109703b51fba612ef0b"' }>
                                            <li class="link">
                                                <a href="components/AddIngredientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddIngredientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddIngredientDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddIngredientDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddMenuDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddMenuDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddStaffComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddStaffComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddStaffDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddStaffDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AllergensChipsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AllergensChipsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BasketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BasketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CallWaiterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CallWaiterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerInterfaceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomerInterfaceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExpansionPannelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExpansionPannelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IngredientsDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IngredientsDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KitchenMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KitchenMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagerMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagerMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenusListDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenusListDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderTrackerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderTrackerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrdersListDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrdersListDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaymentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PickTableDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PickTableDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReadyToOrderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReadyToOrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SalesDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SalesDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectTableDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectTableDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablesListDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TablesListDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WaiterMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WaiterMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/LandingPageComponent.html" data-type="entity-link">LandingPageComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Customer.html" data-type="entity-link">Customer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ingredient.html" data-type="entity-link">Ingredient</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link">Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/Meal.html" data-type="entity-link">Meal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Menu.html" data-type="entity-link">Menu</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuCategory.html" data-type="entity-link">MenuCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/selectedCategory.html" data-type="entity-link">selectedCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Staff.html" data-type="entity-link">Staff</a>
                            </li>
                            <li class="link">
                                <a href="classes/Table.html" data-type="entity-link">Table</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link">CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientService.html" data-type="entity-link">IngredientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InputService.html" data-type="entity-link">InputService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MealService.html" data-type="entity-link">MealService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuCategoryService.html" data-type="entity-link">MenuCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuFilterService.html" data-type="entity-link">MenuFilterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link">MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link">OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StaffService.html" data-type="entity-link">StaffService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableService.html" data-type="entity-link">TableService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});