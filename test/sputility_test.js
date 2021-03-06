(function($) {
   /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/
    
    Test methods:
    module(name, {[setup][ ,teardown]})
    test(name, callback)
    expect(numberOfAssertions)
    stop(increment)
    start(decrement)
    Test assertions:
    ok(value, [message])
    equal(actual, expected, [message])
    notEqual(actual, expected, [message])
    deepEqual(actual, expected, [message])
    notDeepEqual(actual, expected, [message])
    strictEqual(actual, expected, [message])
    notStrictEqual(actual, expected, [message])
    throws(block, [expected], [message])
    */

   module("Main");

   test("The static function to get SPFields is available.", function() {
      ok(SPUtility.GetSPField);
      ok($);
   });

   test("spfield throws an error when the field was not found", function() {
      throws(
              function() {
                 SPUtility.GetSPField('foo bar');
              },
              "Unable to get a SPField named foo bar",
              "Correct error was thrown"
              );
   });

   module("SPTextField", {
      setup: function() {
         this.textboxId = 'ctl00_m_g_b2a76005_5d3d_4591_9f83_b32d5af4e808_ctl00_ctl05_ctl00_ctl00_ctl00_ctl04_ctl00_ctl00_TextField';
         this.field = SPUtility.GetSPField('Title');
      }
   });

   test("Get the field", function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldText", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Textbox.id,
              this.textboxId,
              "Textbox property is not set or is set to the wrong to the wrong DOM object.");
   });

   test("Get and set the value", function() {
      expect(1);

      var expected = 'foo bar';
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   test("MakeReadOnly()", function() {
      expect(1);

      var expected = 'foo bar';
      this.field.SetValue(expected);
      this.field.MakeReadOnly();

      ok('make read only ok');
   });

   module("ContentTypeChoice", {
      setup: function() {
         this.dropdownId = 'sputility-contenttype';
         this.field = SPUtility.GetSPField('Content Type');
      }
   });

   test("Get the field", function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "ContentTypeChoice", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Dropdown.id,
              this.dropdownId,
              "Dropdown property is not set or is set to the wrong to the wrong DOM object.");
   });

   test("Get and set the value", function() {
      expect(1);

      var expected = 'Item';
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   test("Get and set the value using content type id", function() {
      expect(1);

      var expected = 'Schedule and Reservations';
      this.field.SetValue('0x01020072BB2A38F0DB49C3A96CF4FA8552995600C75E64B08FECF44588B8BCA97362240C');

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   test("MakeReadOnly()", function() {
      expect(3);

      var expected = 'Reservations';
      this.field.SetValue('0x0102004F51EFDEA49C49668EF9C6744C8CF87D00107B364268BC6A4BB2FC37572DC79248');
      this.field.MakeReadOnly();
      var actual = this.field.ReadOnlyLabel.text();

      strictEqual(actual,
          expected,
          "Validate SetValue() updates the read-only label.");
      strictEqual($(this.field.Controls).css('display'), "none");
      this.field.MakeEditable();
      ok($(this.field.Controls).css('display') !== "none");
   });

   module("SPNumberField", {
      setup: function() {
         this.textboxId = 'ctl00_m_g_b2a76005_5d3d_4591_9f83_b32d5af4e808_ctl00_ctl05_ctl08_ctl00_ctl00_ctl04_ctl00_ctl00_TextField';
         this.field = SPUtility.GetSPField('Number');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldNumber", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Textbox.id,
              this.textboxId,
              "Textbox property is not set or is set to the wrong to the wrong DOM object.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = 42;
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   module("SPCurrencyField", {
      setup: function() {
         this.textboxId = 'ctl00_m_g_b2a76005_5d3d_4591_9f83_b32d5af4e808_ctl00_ctl05_ctl09_ctl00_ctl00_ctl04_ctl00_ctl00_TextField';
         this.field = SPUtility.GetSPField('Currency');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldCurrency", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Textbox.id,
              this.textboxId,
              "Textbox property is not set or is set to the wrong to the wrong DOM object.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = 42;
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });

   module("SPFieldChoice - Dropdown", {
      setup: function() {
         this.dropdownId = 'ctl00_m_g_b2a76005_5d3d_4591_9f83_b32d5af4e808_ctl00_ctl05_ctl04_ctl00_ctl00_ctl04_ctl00_DropDownChoice';
         this.field = SPUtility.GetSPField('Dropdown Choice');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldChoice", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Dropdown.id,
              this.dropdownId,
              "Textbox property is not set or is set to the wrong to the wrong DOM object.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Textbox.");
   });
   
   test("Try setting the field to garbage (throws an exception)", function() {
      expect(1);
      
      throws(function(){
         this.field.SetValue("foo bar");
      });
   });
   
   module("SPFieldChoice Dropdown (with fill in)", {
      setup: function() {
         this.dropdownId = 'ctl00_m_g_b2a76005_5d3d_4591_9f83_b32d5af4e808_ctl00_ctl05_ctl05_ctl00_ctl00_ctl04_ctl00_DropDownChoice';
         this.field = SPUtility.GetSPField('Dropdown Choice with Fill-in');
      }
   });

   test('GetSPField()', function() {
      expect(5);
      notStrictEqual(this.field, null, "GetSPField should have returned an object.");
      notStrictEqual(this.field.FillInElement, null, "Fill in element should have an element.");
      strictEqual(this.field.FillInAllowed, true, "Fill in should be allowed.");
      strictEqual(this.field.Type, "SPFieldChoice", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Dropdown.id,
              this.dropdownId,
              "Textbox property is not set or is set to the wrong to the wrong DOM object.");

   });

   test("SetValue() and GetValue()", function() {
      expect(2);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set dropdown.");

      expected = "foo bar";
      this.field.SetValue(expected);
      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set fill in value.");
   });
   
   module("SPFieldChoice - Radio buttons", {
      setup: function() {
         this.field = SPUtility.GetSPField('Radio Buttons');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldChoice", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.RadioButtons.length,
              5,
              "RadioButtons property is not set or is set to the wrong to the wrong DOM object.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Radio button.");
   });
   
   test("Try setting the field to garbage (throws an exception)", function() {
      expect(1);
      
      throws(function(){
         this.field.SetValue("foo bar");
      });
   });
   
   module("SPFieldChoice - Radio buttons with fill-in", {
      setup: function() {
         this.field = SPUtility.GetSPField('Radio Buttons with Fill-in');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldChoice", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.RadioButtons.length,
              3,
              "RadioButtons property is not set or is set to the wrong to the wrong DOM object.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = "Charlie";
      this.field.SetValue(expected);

      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Radio button.");
   });
   
   test("Set the fill-in value", function() {
      expect(2);
      
      var expected = "foo bar";
      this.field.SetValue(expected);
      strictEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set Radio fill-in choice.");
      strictEqual($('#ctl00_m_g_a94984b1_b613_4db4_8e53_e809e1fc4a0b_ctl00_ctl04_ctl19_ctl00_ctl00_ctl04_ctl00_ctl04').val(),
         expected,
         "Expect the fill-in textbox to be set correctly.");
   });

   module("SPFieldChoice - Checkboxes", {
      setup: function() {
         this.field = SPUtility.GetSPField('Checkboxes');
      }
   });

   test('GetSPField()', function() {
      expect(3);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldMultiChoice", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Checkboxes.length,
              5,
              "There are not 5 checkboxes.");
   });

   test("SetValue() and GetValue()", function() {
      expect(1);

      var expected = ["Alpha", "Charlie"];
      this.field.SetValue("Alpha", true);
      this.field.SetValue("Charlie", true);

      deepEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set the checkbox.");
   });
   
   test("Try setting the field to garbage (throws an exception)", function() {
      expect(1);
      
      throws(function(){
         this.field.SetValue("foo bar");
      });
   });

   module("SPFieldChoice - Checkboxes with Fill-in", {
      setup: function() {
         this.field = SPUtility.GetSPField('Checkboxes with Fill-in');
      }
   });

   test('GetSPField()', function() {
      expect(5);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      notStrictEqual(this.field.FillInElement, null, "Fill in element should have an element.");
      strictEqual(this.field.FillInAllowed, true, "Fill in should be allowed.");
      strictEqual(this.field.Type, "SPFieldMultiChoice", "Wrong type: " + this.field.Type);
      strictEqual(
              this.field.Checkboxes.length,
              5,
              "There are not 5 checkboxes.");
   });

   test("SetValue() and GetValue()", function() {
      expect(2);

      var expected = ["Alpha", "Charlie"];
      this.field.SetValue("Alpha", true);
      this.field.SetValue("Charlie", true);

      deepEqual(this.field.GetValue(),
              expected,
              "SetValue() failed to set the checkbox.");

      // pass a value to fill-in
      this.field.SetValue("foo bar");
      expected.push("foo bar");
      deepEqual(this.field.GetValue(),
              expected,
              "Fill-in value should be set now.");
   });



   module("SPFieldDateTime (date only)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Date Only');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldDateTime", "Wrong type: " + this.field.Type);
   });

   test("SetValue() takes one string parameter", function() {
      expect(1);

      var expected = "8/15/2013";
      this.field.SetValue(2013, 8, 15);

      var actual = this.field.GetValue();
      equal(actual.toString(),
              expected,
              "SetValue() didn't set the date textbox.");
   });


   module("SPFieldDateTime (date and time)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Date and Time');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldDateTime", "Wrong type: " + this.field.Type);
   });

   test("SetValue() takes year, month, day, hour (str), and minute (str) parameters", function() {
      expect(1);

      var expected = "8/15/2013 8:30 AM";
      this.field.SetValue(2013, 8, 15, '8 AM', '30');

      var actual = this.field.GetValue();
      equal(actual.toString(),
              expected,
              "SetValue() didn't set the date textbox.");
   });
   
   test("SetValue() takes year, month, day, hour (integer), and minute (str) parameters", function() {
      expect(1);

      var expected = "8/15/2013 8:30 AM";
      this.field.SetValue(2013, 8, 15, 8, '30');

      var actual = this.field.GetValue();
      equal(actual.toString(),
              expected,
              "SetValue() didn't set the date textbox.");
   });
   
   test("SetValue() takes null or empty string to clear the field", function() {
      expect(1);

      var expected = "12:00 AM";
      this.field.SetValue(null);

      var actual = this.field.GetValue().toString();
      equal(actual,
            expected,
            "SetValue() didn't set the date textbox.");
   });
   
   
   module("SPBooleanField (yes/no)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Yes/No');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldBoolean", "Wrong type: " + this.field.Type);
   });

   test("GetValue() and SetValue()", function() {
      expect(1);

      var expected = true;
      this.field.SetValue(true);

      var actual = this.field.GetValue();
      equal(actual,
              expected,
              "SetValue() didn't set the checkbox.");
   });
   
   module("SPURLField (hyperlink)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Hyperlink');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldURL", "Wrong type: " + this.field.Type);
   });

   test("GetValue() and SetValue()", function() {
      expect(3);

      var expected = ['http://sputility.codeplex.com', 'SPUtility.js'];
      this.field.SetValue(expected[0], expected[1]);
      
      // make sure both textboxes were set correctly
      equal($('#Hyperlink_2ef372e5-47ae-4d20-89dd-5a43e5428ae6_UrlFieldUrl').val(), expected[0]);
      equal($('#Hyperlink_2ef372e5-47ae-4d20-89dd-5a43e5428ae6_UrlFieldDescription').val(), expected[1]);
      
      // Gets the value of the hyperlink field as an array
      var actual = this.field.GetValue();
      deepEqual(actual, expected,
              "GetValue() should return an array of two strings containing URL and Description.");
   });
   
   module("SPLookupField (single-select, small lookup)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Small Lookup');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldLookup", "Wrong type: " + this.field.Type);
   });

   test("GetValue() and SetValue()", function() {
      expect(2);

      var expected = 'Charlie';
      this.field.SetValue(expected);
      
      // make sure the select was set correctly
      equal($('#Small_x0020_Lookup_fc0ce102-b10d-48f1-bdce-760fd008eead_LookupField').val(), '3');
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   module("SPLookupField (single-select, big lookup with autocomplete)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Large Lookup Field');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldLookup", "Wrong type: " + this.field.Type);
   });

   test("GetValue() and SetValue()", function() {
      expect(2);

      var expected = 'Charlie';
      this.field.SetValue(expected);
      
      // make sure the select was set correctly
      equal($('#ctl00_m_g_a94984b1_b613_4db4_8e53_e809e1fc4a0b_ctl00_ctl04_ctl12_ctl00_ctl00_ctl04_ctl00_ctl01').val(), expected);
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   module("SPFieldNote (multi-line, plain text)", {
      setup: function() {
         this.field = SPUtility.GetSPField('Multi-line Plain Text');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldNote");
   });

   test("GetValue() and SetValue()", function() {
      expect(2);

      var expected = 'Hello world!';
      this.field.SetValue(expected);
      
      // make sure the select was set correctly
      equal($('#ctl00_m_g_a94984b1_b613_4db4_8e53_e809e1fc4a0b_ctl00_ctl04_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField').val(), expected);
      
      var actual = this.field.GetValue();
      strictEqual(actual, expected);
   });
   
   module("SPLookupMultiField", {
      setup: function() {
         this.field = SPUtility.GetSPField('Multi-Priority Lookup Field');
      }
   });

   test('GetSPField()', function() {
      expect(6);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldLookupMulti", "Expected type is SPFieldLookupMulti");
      ok(this.field.ListChoices, "Expected to have a property named ListChoices");
      ok(this.field.ListSelections, "Expected to have a property named ListSelections");
      ok(this.field.ButtonAdd, "Expected to have a property named ButtonAdd");
      ok(this.field.ButtonRemove, "Expected to have a property named ButtonRemove");
   });
   
   
   module("SPUserField", {
      setup: function() {
         this.field = SPUtility.GetSPField('Person or Group');
      }
   });

   test('GetSPField()', function() {
      expect(2);
      notStrictEqual(this.field, null, "GetSPField returned null (should have returned an object).");
      strictEqual(this.field.Type, "SPFieldUser", "Wrong type: " + this.field.Type);
   });

   /* Unable to test People fields locally
    * test("Correct properties are set", function() {
      expect(2);
      ok(this.field.ClientPeoplePicker, 'ClientPeoplePicker property not set');
      ok(this.field.EditorInput, 'EditorInput property not set');
   });*/
   
   module("Miscellaneous tests");
   
   test('Splitting autocomplete choices', function() {
      expect(1);
      
      // a list item ID was passed to the function so attempt to lookup the text value
      var choices = '(None)|0|A pipe || in the middle|31|AAA BBB CCC|30|Alpha|1|Bravo|2|Charlie|3|Delta|4|Echo|5|Foxtrot|6|Golf|7|Hotel|8|India|9|Juliet|10|Kilo|11|Lima|12|Mike|13|November|14|Oscar|15|Papa|16|Quebec|17|Romeo|18|Sierra|19|Tango|29';
      var expected = [
         "(None)",
         "0",
         "A pipe || in the middle",
         "31",
         "AAA BBB CCC",
         "30",
         "Alpha",
         "1",
         "Bravo",
         "2",
         "Charlie",
         "3",
         "Delta",
         "4",
         "Echo",
         "5",
         "Foxtrot",
         "6",
         "Golf",
         "7",
         "Hotel",
         "8",
         "India",
         "9",
         "Juliet",
         "10",
         "Kilo",
         "11",
         "Lima",
         "12",
         "Mike",
         "13",
         "November",
         "14",
         "Oscar",
         "15",
         "Papa",
         "16",
         "Quebec",
         "17",
         "Romeo",
         "18",
         "Sierra",
         "19",
         "Tango",
         "29"
      ];
      
      // split the string on every pipe character followed by a digit
      choices = choices.split(/\|(?=\d+)/);
      var c = [], pipeIndex;
      c.push(choices[0]);
      for (var i = 1; i < choices.length - 1; i++) {
         pipeIndex = choices[i].indexOf('|'); // split on the first pipe only
         c.push(choices[i].substring(0, pipeIndex));
         c.push(choices[i].substring(pipeIndex+1));
      }
      c.push(choices[choices.length-1]);
      
      deepEqual(c, expected);
   });
   
}(jQuery));
