import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography/typography'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'large',
        'H1',
        'H2',
        'H3',
        'body-1',
        'body-2',
        'caption',
        'link-1',
        'link-2',
        'overline',
        'subtitle-1',
        'subtitle-2',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Large Text',
    disabled: false,
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'H1 Text',
    disabled: false,
    variant: 'H1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'H2 Text',
    disabled: false,
    variant: 'H2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'H3 Text',
    disabled: false,
    variant: 'H3',
  },
}

export const body_1: Story = {
  args: {
    children: 'Body-1 Text',
    disabled: false,
    variant: 'body-1',
  },
}

export const body_2: Story = {
  args: {
    children: 'Body-2 Text',
    disabled: false,
    variant: 'body-2',
  },
}

export const caption: Story = {
  args: {
    children: 'Caption Text',
    disabled: false,
    variant: 'caption',
  },
}

export const link_1: Story = {
  args: {
    as: 'a',
    children: 'Link-1 Text',
    disabled: false,
    variant: 'link-1',
  },
}

export const link_2: Story = {
  args: {
    as: 'a',
    children: 'Link-2 Text',
    disabled: false,
    variant: 'link-2',
  },
}

export const overline: Story = {
  args: {
    children: 'Overline Text',
    disabled: false,
    variant: 'overline',
  },
}

export const subtitle_1: Story = {
  args: {
    children: 'Subtitle-1 Text',
    disabled: false,
    variant: 'subtitle-1',
  },
}

export const subtitle_2: Story = {
  args: {
    children: 'Subtitle-2 Text',
    disabled: false,
    variant: 'subtitle-2',
  },
}
