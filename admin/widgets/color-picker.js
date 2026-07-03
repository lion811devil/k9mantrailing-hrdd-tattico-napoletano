// Custom color picker widget for Decap CMS
(function () {
  if (!window.CMS) return;

  const ColorControl = createClass({
    handleChange: function (e) {
      this.props.onChange(e.target.value);
    },

    render: function () {
      const value = this.props.value || "#ff7a00";

      return h("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }
      },
        h("input", {
          type: "color",
          value: value,
          onChange: this.handleChange,
          style: {
            width: "58px",
            height: "42px",
            border: "0",
            padding: "0",
            background: "transparent",
            cursor: "pointer"
          }
        }),
        h("input", {
          type: "text",
          value: value,
          onChange: this.handleChange,
          placeholder: "#ff7a00",
          style: {
            width: "130px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }
        }),
        h("span", {
          style: {
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: value,
            display: "inline-block"
          }
        })
      );
    }
  });

  const ColorPreview = createClass({
    render: function () {
      const value = this.props.value || "";
      return h("span", {}, value);
    }
  });

  CMS.registerWidget("color", ColorControl, ColorPreview);
})();
