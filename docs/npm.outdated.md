[[ BACK (to readme.md) ]](../README.md) &nbsp; [[ API ]](api.index.md) &nbsp;
[[ Contributing ]](contributing.md) &nbsp;
[[ HELP (jsbr npm dependency) ]](npm.dependency.md) &nbsp;
[[ HELP (jsbr npm install) ]](npm.install.md) &nbsp;
[[ HELP (jsbr npm run) ]](npm.run.md) &nbsp;
[[ Frameworks ]](frameworks.md) &nbsp; [[ Grunt ]](grunt.md)

### install ###
<blockquote>
  <p>Call <code>npm outdated</code> for one or more projects.</p>

  <table border=0 width=100%>
    <tr><th colspan="3" style="text-align:left"><b>format</b></th></tr>
    <tr><th colspan="3" style="text-align:left">&gt; jsbr npm install --script &lt;scriptname&gt; [options] [directories]</th></tr>
    <tr><th colspan="3" style="text-align:left"><b>options</b></th></tr>
    <tr><td>--json</td>
        <td style="text-align:center">boolean</td>
        <td>show information in JSON format.</td>
        </tr>
    <tr><td>--long</td>
        <td style="text-align:center">boolean</td>
        <td>show extended information.</td>
        </tr>
    <tr><td>--parseable</td>
        <td style="text-align:center">boolean</td>
        <td>show parseable output instead of tree view.</td>
        </tr>
    <tr><td>--global</td>
        <td style="text-align:center">boolean</td>
        <td>check packages in the global install prefix instead of in the current project.</td>
        </tr>
    <tr><td>--depth</td>
        <td style="text-align:center">integer</td>
        <td>max depth for checking dependency tree.</td>
        </tr>
    <tr><th colspan="3" style="text-align:left"><b>additional options</b> (will extend the arguments iterated by <code>jsbr fs clean</code>)</th></tr>
    <tr><td>--env:args:use:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname'</td>
        </tr>
    <tr><td>--env:args:append:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname' and append them to existing arguments.</td>
        </tr>
    <tr><td>--env:args:prepend:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>read the arguments (directories) from property 'propertyname' and prepend them to existing arguments.</td>
        </tr>
    <tr><th colspan="3" style="text-align:left"><b>additional options</b> (will narrow the arguments iterated by <code>jsbr fs clean</code>)</th></tr>
    <tr><td>--args:from</td>
        <td style="text-align:center">integer</td>
        <td>start cleaning task at and including this position, in the list of directories (arguments)</td>
        </tr>
    <tr><td>--args:to</td>
        <td style="text-align:center">integer</td>
        <td>stop cleaning task at and including this position, in the list of directories (arguments)</td>
        </tr>
    <tr><td>--args:index</td>
        <td style="text-align:center">integer</td>
        <td>run cleaning task (only!) for this position, in the list of directories (arguments)<br />
            (will override any ranges set by --args:from and --args:to)</td>
        </tr>
    <tr><th colspan="3" style="text-align:left"><b>special options</b></th></tr>
    <tr><td>--env:opt:[optionname]:[propertyname]</td>
        <td style="text-align:center">boolean</td>
        <td>inject an option by using a property value (configuration file)</td>
        </tr>
    <tr><td>--debug</td>
        <td style="text-align:center">boolean</td>
        <td>display debug information</td>
        </tr>
    <tr><td>--help</td>
        <td style="text-align:center">boolean</td>
        <td>display help for command <code>jsbr fs clean</code></td>
        </tr>
  </table>      

  <p><b>examples:</b></p>
  <br />

  <p>
    Run 'npm outdated' for all projects in the global list of projects

  ```bash
  > jsbr npm outdated
  ```
  </p>
</blockquote>
