module.exports.navbar = () => {
  return [
    {
      class: 'navbar navbar-expand-md navbar-dark bg-dark fixed-top',
      a: [
        {
          class: 'navbar-brand',
          value: 'Logo'
        }
      ],
      button: [
        {
          class: 'navbar-toggler',
          type: 'button',
          span: [
            {
              class: 'navbar-toggler-icon'
            }
          ]
        }
      ]
    }
  ]
}
