import { ComponentStory, ComponentMeta } from '@storybook/react'

import RoundedButton from '.'

export default {
  title: 'Buttons/Rounded',
  component: RoundedButton
} as ComponentMeta<typeof RoundedButton>

const Template: ComponentStory<typeof RoundedButton> = (args) => {
  const { variant, children, ...rest } = args
  return (
    <RoundedButton variant={variant || 'primary'} {...rest}>
      {children}
    </RoundedButton>
  )
}

export const Primary = Template.bind({})

Primary.args = {
  children: 'Click me'
}

export const secondary = Template.bind({})
secondary.args = {
  variant: 'secondary',
  children: 'Click me'
}
