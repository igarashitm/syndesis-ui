import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CurrentFlow, FlowEvent } from '../current-flow.service';
import { FlowPage } from '../flow-page';
import { Tag } from '../../../model';

@Component({
  selector: 'ipaas-integrations-integration-basics',
  templateUrl: 'integration-basics.component.html',
})
export class IntegrationBasicsComponent extends FlowPage {

  constructor(
    public currentFlow: CurrentFlow,
    public route: ActivatedRoute,
    public router: Router,
    ) {
    super(currentFlow, route, router);
  }

  canContinue() {
    return this.currentFlow.integration.name && this.currentFlow.integration.name !== '' &&
           this.currentFlow.integration.description && this.currentFlow.integration.description !== '';
  }

  continue() {
    this.router.navigate(['save-or-add-step'], { queryParams: { validate: true }, relativeTo: this.route.parent });
  }

  get name(): string {
    const name = this.currentFlow.integration.name || '';
    return name;
  }

  set name(name: string) {
    this.currentFlow.events.emit({
      kind: 'integration-set-property',
      property: 'name',
      value: name,
    });
  }

  get description(): string {
    return this.currentFlow.integration.description || '';
  }

  set description(description: string) {
    this.currentFlow.events.emit({
      kind: 'integration-set-property',
      property: 'description',
      value: description,
    });
  }

  get tagsArray(): string[] {
    return (this.currentFlow.integration.tags || []).map((tag) => tag.name);
  }

  get tags(): string {
    return this.tagsArray.join(', ');
  }

  set tags(tags: string) {
    const _tags = tags.split(',').map((str) => <Tag> { name: str.trim() });
    this.currentFlow.events.emit({
      kind: 'integration-set-property',
      property: 'tags',
      value: _tags,
    });
  }

}
