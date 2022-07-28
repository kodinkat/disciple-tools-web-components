import { html } from 'lit';
import { themeCss } from '../../../stories-theme.js';
import '../dt-multi-select.js';

const basicOptions = [
  {
    id: 'opt1',
    label: 'Option 1',
  },
  {
    id: 'opt2',
    label: 'Option 2',
  },
  {
    id: 'opt3',
    label: 'Option 3',
  },
  {
    id: 'opt4',
    label: 'Option 4',
  },
  {
    id: 'opt5',
    label: 'Option 5',
  },
  {
    id: 'opt6',
    label: 'Option 6',
  },
  {
    id: 'opt7',
    label: 'Option 7',
  },
  {
    id: 'opt8',
    label: 'Option 8',
  },
];
export default {
  title: 'dt-multi-select',
  component: 'dt-multi-select',
  argTypes: {
    name: {
      control: 'text',
      type: { name: 'string', required: true },
      description:
        'Passed to `change` function to identify which input triggered the event',
    },
    value: {
      control: 'text',
      type: { name: 'array' },
      table: {
        type: {
          summary: 'string[]',
          detail: `['1', '345', '83']`,
        },
      },
      description:
        'Array of values indicating the selected values. Should be an array of strings converted to a string with `JSON.stringify`. <br/>**Note:** This attribute will be updated on the HTML element when value changes.',
    },
    options: {
      description:
        'Array of available options to choose.' +
        '<br/>**Format:** Array of objects with keys `id` and `label`. Convert to string with `JSON.stringify`. ',
      table: {
        type: {
          summary: '{id:string, label:string}[]',
          detail: `[{id:'1',label:'Item 1'},{id:'345',label:'Item 345'}]`,
        },
      },
    },
    placeholderLabel: {
      control: 'text',
      description: 'String rendered as placeholder text',
    },
    loading: {
      control: 'boolean',
      description:
        '(true|false) If attribute is present, the loading spinner will be displayed within the field',
      table: {
        type: {
          summary: 'loading',
          detail: '<dt-multi-select loading />',
        },
      },
    },
    saved: {
      control: 'boolean',
      description:
        '(true|false) If attribute is present, the saved checkmark will be displayed within the field',
      table: {
        type: {
          summary: 'saved',
          detail: '<dt-multi-select saved />',
        },
      },
    },
    onchange: {
      control: 'text',
      description:
        'Javascript code to be executed when the value of the field changes. Makes available a `event` variable that includes field name, old value, and new value in `event.details`',
      table: {
        type: {
          summary: 'onChange(event)',
          detail: '<dt-multi-select onchange="onChange(event)" />',
        },
      },
    },
  },
};

function Template(args) {
  const {
    name = 'my-input',
    options,
    placeholderLabel,
    value,
    onchange,
    loading,
    saved,
    open,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <script>
      function onChange(event) {
        if (event?.target) {
          event.target.setAttribute('loading', true);
          console.log(
            'Value changed from ' +
              JSON.stringify(event.detail.oldValue) +
              ' to ' +
              JSON.stringify(event.detail.newValue)
          );
          setTimeout(function () {
            event.target.removeAttribute('loading');
            event.target.setAttribute('saved', true);
          }, 1000);
        }
      }
    </script>
    <dt-multi-select
      name="${name}"
      placeholderLabel="${placeholderLabel}"
      options="${JSON.stringify(options)}"
      value="${JSON.stringify(value)}"
      onchange="${onchange}"
      ?loading="${loading}"
      ?saved="${saved}"
      .open="${open}"
    >
    </dt-multi-select>
  `;
}

export const Empty = Template.bind({});

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  options: basicOptions,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholderLabel: 'Search Options',
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: ['opt2', 'opt3'],
  options: basicOptions,
};
export const OptionsWrap = Template.bind({});
OptionsWrap.args = {
  value: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6', 'opt7'],
  options: basicOptions,
};
export const OptionsOpen = Template.bind({});
OptionsOpen.args = {
  value: ['opt1'],
  options: basicOptions,
  open: true,
};
export const NoOptionsAvailable = Template.bind({});
NoOptionsAvailable.args = {
  value: ['opt1', 'opt2', 'opt3'],
  options: basicOptions.slice(0, 3),
  open: true,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  options: basicOptions,
  onchange: 'onChange(event)',
};

export const Loading = Template.bind({});
Loading.args = {
  value: ['opt2'],
  options: basicOptions,
  loading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  value: ['opt2'],
  options: basicOptions,
  saved: true,
};
