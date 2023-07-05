import { MemberEditComponent } from '../../members/components/memberEdit/memberEdit.component';

export function preventUnsavedChanges(component: MemberEditComponent) {
  if (component.editForm.dirty) {
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
  }
  return true;
}
