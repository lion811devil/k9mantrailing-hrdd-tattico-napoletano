// Color Picker Widget per Decap CMS
// Percorso previsto: /admin/widgets/color-picker.js
// Widget: colorpicker

(function () {
  function normalizeHex(value) {
    var raw = String(value || '').trim();
    if (!raw) return '';
    if (raw[0] !== '#') raw = '#' + raw;
    raw = raw.replace(/[^#0-9a-fA-F]/g, '');
    if (/^#[0-9a-fA-F]{3}$/.test(raw)) {
      return '#' + raw[1] + raw[1] + raw[2] + raw[2] + raw[3] + raw[3];
    }
    if (/^#[0-9a-fA-F]{6}$/.test(raw)) return raw.toLowerCase();
    return String(value || '');
  }

  function isValidHex(value) {
    return /^#[0-9a-fA-F]{6}$/.test(String(value || '').trim());
  }

  var ColorPickerControl = createClass({
    handleTextChange: function (event) {
      this.props.onChange(event.target.value);
    },
    handleTextBlur: function (event) {
      this.props.onChange(normalizeHex(event.target.value));
    },
    handleColorChange: function (event) {
      this.props.onChange(event.target.value);
    },
    render: function () {
      var value = this.props.value || '';
      var normalized = normalizeHex(value);
      var colorValue = isValidHex(normalized) ? normalized : '#ff7a00';
      var field = this.props.field || {};
      var hint = field.get ? field.get('hint') : '';

      return h('div', { style: { display: 'grid', gap: '10px' } },
        h('div', {
          style: {
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }
        },
          h('input', {
            type: 'color',
            value: colorValue,
            onChange: this.handleColorChange,
            style: {
              width: '66px',
              height: '48px',
              padding: '2px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              background: '#fff',
              cursor: 'pointer'
            }
          }),
          h('input', {
            type: 'text',
            value: value,
            onChange: this.handleTextChange,
            onBlur: this.handleTextBlur,
            placeholder: '#ff7a00',
            style: {
              flex: '1 1 180px',
              minWidth: '160px',
              minHeight: '44px',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              fontFamily: 'monospace'
            }
          }),
          h('div', {
            title: value || 'Nessun colore impostato',
            style: {
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              background: colorValue,
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.08)'
            }
          })
        ),
        hint ? h('div', { style: { color: '#6b7280', fontSize: '13px' } }, hint) : null
      );
    }
  });

  var ColorPickerPreview = createClass({
    render: function () {
      var value = normalizeHex(this.props.value || '');
      var colorValue = isValidHex(value) ? value : '#ff7a00';
      return h('div', {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 10px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontFamily: 'Arial, sans-serif'
        }
      },
        h('span', {
          style: {
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            background: colorValue,
            border: '1px solid #ccc'
          }
        }),
        h('span', {}, value || 'Nessun colore')
      );
    }
  });

  if (window.CMS) {
    CMS.registerWidget('colorpicker', ColorPickerControl, ColorPickerPreview);
  }
})();
