var kf_dist_scss  = `
// Kf - Sass animation library (v.1.0.0)
// Kf is a Sass library that generates animation CSS keyframes from Sass maps.
// 
// Documentation: http://kf-sass.com
// Github:        http://github.com/mil/kf-sass

// "BUY MILES A BEER LICENSE" (Revision 26):
// Miles Alan <m@milesalan.com> wrote this library. As long as you retain the
// full text of this license in your project or derivative work, you can do
// whatever you want with this thing. Also, if someday we meet and you want
// to buy me a beer as a token of gratitude, then you should.

@function _cast-list($input) {
  @return if(type-of($input) != list, ($input,), $input);
}
@function _change-list-seperator($list, $seperator: comma) {
  @return join($list, (), $seperator);
}
@function _compare-strings($a, $b) {
  $ord: "&:.abcdefghijklmnopqrstuvwxyz0123456789-_";
  @for $i from 1 through max(str-length($a), str-length($b)) {
    $av: str-slice($a, $i, $i);
    $bv: str-slice($b, $i, $i);
    @if $av == "" or $av == null  { @return -1; }
    @if $bv == "" or $bv == null  { @return 1; }
    $ap: str-index($ord, to-lower-case($av));
    $bp: str-index($ord, to-lower-case($bv));
    @if $ap == null and $bp == null { @return 0; }
    @if $ap == null { @return -1; }
    @if $bp == null { @return 1; }
    @if $ap > $bp { @return 1; } @else if $ap < $bp { @return -1 }
  }
  @return 0;
}
@function _convert-s-to-ms-map-keys($map) {
  @each $k, $v in $map {
    @if unit($k) == s {
      $map: map-remove($map, $k);
      $map: map-merge($map, (0ms + $k: $v));
    }
  }
  @return $map;
}
@function _deep-map-merge($map-one, $map-two) {
  @if type-of($map-one) != map or type-of($map-two) != map {
    @return $map-two;
  }
  @each $k, $v in $map-two {
    $map-one: map-merge($map-one, ($k: _deep-map-merge(map-get($map-one, $k), $v)));
  }
  @return $map-one;
}
@function _filter-function(
  $list,
  $function_name,
  $args...
) {
  $return_list: ();
  @if length($list) > 0 {
    @for $index from 1 through length($list) {
      $call-result: null;
      $item: nth($list, $index);
      $call-result: call(get-function($function_name), $item, $args...);
      @if $call-result {
        $return_list: append($return_list, $item);
      }
    }
  }
  @return $return_list;
}
$valid-prop-names: (align-content align-items alignment-baseline align-self all animation animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-timing-function appearance azimuth background background-attachment background-blend-mode background-clip background-color background-image background-image-transform background-origin background-position background-repeat background-size baseline-shift block-size block-step block-step-align block-step-insert block-step-round block-step-size bookmark-label bookmark-level bookmark-state border border-block border-block-color border-block-end border-block-end-color border-block-end-style border-block-end-width border-block-start border-block-start-color border-block-start-style border-block-start-width border-block-style border-block-width border-bottom border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-boundary border-collapse border-color border-image border-image-outset border-image-repeat border-image-slice border-image-source border-image-transform border-image-width border-inline border-inline-color border-inline-end border-inline-end-color border-inline-end-style border-inline-end-width border-inline-start border-inline-start-color border-inline-start-style border-inline-start-width border-inline-style border-inline-width border-left border-left-color border-left-style border-left-width border-radius border-right border-right-color border-right-style border-right-width border-spacing border-style border-top border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width border-width bottom box-decoration-break box-shadow box-sizing box-snap break-after break-before break-inside caption-side caret caret-color caret-shape chains clear clip clip-path clip-rule color color-adjust color-interpolation-filters column-count column-fill column-gap column-rule column-rule-color column-rule-style column-rule-width columns column-span column-width contain content continue counter-increment counter-reset counter-set cue cue-after cue-before cursor direction display dominant-baseline elevation empty-cells fill fill-break fill-color fill-image fill-opacity fill-origin fill-position fill-repeat fill-rule fill-size filter flex flex-basis flex-direction flex-flow flex-grow flex-shrink flex-wrap float float-defer float-offset float-reference flood-color flood-opacity flow flow-from flow-into font font-family font-feature-settings font-kerning font-language-override font-max-size font-min-size font-optical-sizing font-palette font-size font-size-adjust font-stretch font-style font-synthesis font-variant font-variant-alternates font-variant-caps font-variant-east-asian font-variant-emoji font-variant-ligatures font-variant-numeric font-variant-position font-variation-settings font-weight footnote-display footnote-policy gap glyph-orientation-vertical grid grid-area grid-auto-columns grid-auto-flow grid-auto-rows grid-column grid-column-end grid-column-start grid-row grid-row-end grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows hanging-punctuation height hyphenate-character hyphenate-limit-chars hyphenate-limit-last hyphenate-limit-lines hyphenate-limit-zone hyphens image-orientation image-resolution initial-letter initial-letter-align initial-letter-wrap inline-size inset inset-block inset-block-end inset-block-start inset-inline inset-inline-end inset-inline-start isolation justify-content justify-items justify-self left letter-spacing lighting-color line-break line-grid line-height line-height-step line-snap list-style list-style-image list-style-position list-style-type margin margin-block margin-block-end margin-block-start margin-bottom margin-inline margin-inline-end margin-inline-start margin-left margin-right margin-top marker marker-end marker-knockout-left marker-knockout-right marker-mid marker-pattern marker-segment marker-side marker-start marquee-direction marquee-loop marquee-speed marquee-style mask mask-border mask-border-mode mask-border-outset mask-border-repeat mask-border-slice mask-border-source mask-border-width mask-clip mask-composite mask-image mask-mode mask-origin mask-position mask-repeat mask-size mask-type max-block-size max-height max-inline-size max-lines max-width min-block-size min-height min-inline-size min-width mix-blend-mode nav-down nav-left nav-right nav-up object-fit object-position offset offset-after offset-anchor offset-before offset-distance offset-end offset-path offset-position offset-rotate offset-start opacity order orphans outline outline-color outline-offset outline-style outline-width overflow overflow-style overflow-wrap overflow-x overflow-y padding padding-block padding-block-end padding-block-start padding-bottom padding-inline padding-inline-end padding-inline-start padding-left padding-right padding-top page page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range place-content place-items place-self play-during position presentation-level quotes region-fragment resize rest rest-after rest-before richness right rotation rotation-point row-gap ruby-align ruby-merge ruby-position running scrollbar-gutter scroll-behavior scroll-margin scroll-margin-block scroll-margin-block-end scroll-margin-block-start scroll-margin-bottom scroll-margin-inline scroll-margin-inline-end scroll-margin-inline-start scroll-margin-left scroll-margin-right scroll-margin-top scroll-padding scroll-padding-block scroll-padding-block-end scroll-padding-block-start scroll-padding-bottom scroll-padding-inline scroll-padding-inline-end scroll-padding-inline-start scroll-padding-left scroll-padding-right scroll-padding-top scroll-snap-align scroll-snap-stop scroll-snap-type shape-image-threshold shape-inside shape-margin shape-outside size speak speak-as speak-header speak-numeral speak-punctuation speech-rate stress string-set stroke stroke-align stroke-alignment stroke-break stroke-color stroke-dashadjust stroke-dasharray stroke-dash-corner stroke-dashcorner stroke-dash-justify stroke-dashoffset stroke-image stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-origin stroke-position stroke-repeat stroke-size stroke-width table-layout tab-size text-align text-align-all text-align-last text-combine-upright text-decoration text-decoration-color text-decoration-line text-decoration-skip text-decoration-skip-ink text-decoration-style text-decoration-width text-emphasis text-emphasis-color text-emphasis-position text-emphasis-skip text-emphasis-style text-indent text-justify text-orientation text-overflow text-shadow text-space-collapse text-space-trim text-spacing text-transform text-underline-offset text-underline-position text-wrap top transform transform-box transform-origin transition transition-delay transition-duration transition-property transition-timing-function unicode-bidi user-select vertical-align visibility voice-balance voice-duration voice-family voice-pitch voice-range voice-rate voice-stress voice-volume volume white-space widows width will-change word-break word-spacing word-wrap wrap-after wrap-before wrap-flow wrap-inside wrap-through writing-mode z-index);
@function _is-a-css-property-name($str) {
  @if type-of($str) != string {
    @return false;
  }
  @if str-slice($str, 1, 1) == "-" {
    @return true;
  }
  @return type-of(index($valid-prop-names, $str)) == number;
}
@function _is-a-map($input) {
  @return type-of($input) == map;
}
@function _is-a-number($value) {
  @return type-of($value) == 'number';
}

@function _is-a-string($value) {
  @return type-of($value) == 'string';
}
@function _is-context-within-selector($selector) {
  @if $selector == null { @return true; }
  @if & == null { @return false; }

  $selector-list: nth(selector-parse($selector), 1);
  $context-list: nth(selector-parse(&), 1);
  @for $i from 1 through length($selector) {
    @if nth($selector, $i) != nth($context-list, $i) {
      @return false;
    }
  }

  @return true;
}
@function _limit-map-keys($map, $list-of-keys) {
  $r: _new-map();

  @each $l in $list-of-keys {
    @if map-has-key($map, $l) {
      $r: map-merge(
        $r, ($l: map-get($map, $l))
      );
    }
  }

  @return $r;
}
@function _list-difference($a, $b) {
  $difference: ();
  @each $ai in $a {
    @if index($b, $ai) == null {
      $difference: append($difference, $ai);
    }
  }
  @return $difference;
}
@function _list-flatten($list) {
  $return-list: ();
  @each $item in $list {
    @if type-of($item) == list {
      $return-list: join($return-list, _list-flatten($item));
    } @else {
      $return-list: append($return-list, $item);
    }
  }
  @return $return-list;
}
@function _list-sum($items) {
  $sum: 0;
  @each $i in $items {
    $sum: $sum + $i;
  }
  @return $sum;
}

@function _list-uniq($items) {
  $uniq: ();
  @each $item in $items {
    $is-missing: index($uniq, $item) == null;
    @if $is-missing {
      $uniq: append($uniq, $item);
    }
  }
  @return $uniq;
}

@function _map-function(
  $list,
  $function_name,
  $args...
) {
  $return_list: ();
  @for $index from 1 through length($list) {
    $call-result: call(get-function($function_name), nth($list, $index), $args...);
    $return_list: append($return_list, $call-result);
  }
  @return $return_list;
}@function _map-has-key-with-value($map, $key, $value) {
  @return map-get($map, $key) == $value;
}
@function _new-map() {
  $m: (a: b);
  $m: map-remove($m, a);
  @return $m;
}
@function _partition-list($list, $function) {
  $a: ();
  $b: ();
  @each $item in $list {
    $call-result: call(get-function($function), $item);
    @if $call-result {
      $a: append($a, $item);
    } @else {
      $b: append($b, $item);
    }
  }
  @return ($a, $b);
}
@function _partition-map-by-key($map, $function) {
  $partitioned-map-keys: _partition-list(
    map-keys($map),
    $function
  );

  $a: _limit-map-keys($map, nth($partitioned-map-keys, 1));
  $b: _limit-map-keys($map, nth($partitioned-map-keys, 2));

  @return (
    $a,
    $b
  );
}
@function _sort-list($list) {
  // Insertion sort implementation
  @if length($list) <= 1 { @return $list; }
  $final: ();
  $final: append($final, nth($list, 1));

  @for $i from 2 through length($list) {
    $compare-to-item: nth($list, $i);
    $final-half-one: ();
    $final-half-two: ();

    @each $final-item in $final {
      $in-front: _sort-list-cmp($compare-to-item, $final-item);

      @if $in-front {
        $final-half-one: append($final-half-one, $final-item);
      } @else {
        $final-half-two: append($final-half-two, $final-item);
      }
    }

    $final-half-one: append($final-half-one, $compare-to-item);
    $final: join($final-half-one, $final-half-two);
  }

  @return $final;
}

@function _sort-list-cmp($a, $b) {
  $in-front: false;
  @if type-of($a) == number and type-of($b) == number {
    $in-front: $b < $a;
  } @else if type-of($a) == string and type-of($b) == string {
    $in-front: _compare-strings($b, $a) < 0;
  } @else if type-of($a) == type-of($b) {
    $in-front: _compare-strings(inspect($b), inspect($a)) < 0;
  } @else {
    $in-front: _compare-strings(type-of($b), type-of($a)) < 0;
  }
  @return $in-front;
}
@function _sort-map-keys-deep($map) {
  @if type-of($map) != map { @return $map; }
  $return-map: _new-map();
  $keys: _sort-list(map-keys($map));
  @each $k in $keys {
    $return-map: _deep-map-merge($return-map, (
      $k: _sort-map-keys-deep(map-get($map, $k))
    ));
  }
  @return $return-map;
}
@function _to-percentage($numerator, $divisor) {
  @return percentage($numerator / $divisor);
}

@function _calculate_animation_length($animation-map) {
  @if map-has-key($animation-map, _kf-duration)  {
    @return map-get($animation-map, _kf-duration);
  }
  @if map-has-key($animation-map, _kf-sleep)  {
    @return map-get($animation-map, _kf-sleep);
  }

  $animation-map: _determine-map-type($animation-map);
  $map-type: map-get($animation-map, _kf-map-type);
  $seperated: _kf-properties-extractor($animation-map);
  $m: nth($seperated, 1);

  // _kf-map-type can be one of (tepv, etpv, or eptv)
  // So this is the most efficient way to extract just the timing-level keys
  $timings: ();
  $timings-level-in-animation-map: str-index($map-type, t);
  @if $timings-level-in-animation-map == 1 {
    $timings: map-keys($m);
  } @else if $timings-level-in-animation-map == 2 {
    $timings: _map-function(map-values($m), map-keys);
  } @else if $timings-level-in-animation-map == 3 {
    $timings: _map-function(
      _list-flatten(
        _map-function(map-values($m), map-values)
      ),
      map-keys
    );
  }

  @return max(_list-flatten($timings)...);
}@function _get-value-type($v) {
  @if type-of($v) == list { $v: nth($v, 1); }
  @if type-of($v) == number and (unit($v) == s or unit($v) == ms) {
    @return t;
  }
  @if _is-a-css-property-name($v) {
    @return p;
  }
  @return e;
}

@function _determine-map-type($map) {
  @if map-get($map, _kf-map-type) != null {
    @return $map;
  }

  $level-1-map-keys: map-keys($map);
  $level-2-map-keys: map-keys(map-get($map, nth($level-1-map-keys, 1)));
  $level-3-map-keys: map-keys(map-get(map-get($map, nth($level-1-map-keys, 1)), nth($level-2-map-keys, 1)));

  $level-1-value-type: _get-value-type(nth($level-1-map-keys, 1));
  $level-2-value-type: _get-value-type(nth($level-2-map-keys, 1));
  $level-3-value-type: _get-value-type(nth($level-3-map-keys, 1));

  $_kf-map-type: $level-1-value-type + $level-2-value-type + $level-3-value-type + "v";
  @return map-merge($map, (_kf-map-type: $_kf-map-type));
}
@function _expand-compound-selectors($eptv-map) {
  $extracted_map: ();
  $old-map: ();

  @each $element, $ptv in $eptv-map {
    @if type-of($element) == list {
      @each $e in $element {
        $extracted-map: _deep-map-merge($extracted-map, ($e: $ptv));
      }
    } @else {
      $old-map: map-merge($old-map, ( $element: $ptv) );
    }
  }
  @return if(
    type-of($extracted-map) == map,
    _deep-map-merge($old-map, $extracted-map),
    $old-map
  );
}
@function _is-greater-than-three-level-map($map) {
  @each $v in _filter-function(map-values($map), _is-a-map) {
    @each $v2 in _filter-function(map-values($v), _is-a-map) {
      @if type-of($v2) == map { @return true; }
    }
  }
  @return false;
}

@function _expand-implicit-selector($map) {
  @if _is-greater-than-three-level-map($map) {
    @return $map;
  } @else {
    @return ('&': $map);
  }
}
@function _expand-super-selectors($eptv-map) {
  // Expand all super-selectors animations to apply to their sub-selectors
  // E.g. so if an animation applies for 'div' - it will also apply for div:nth-child(1)
  $return-map: ();
  $i: 0;
  @each $e, $ptv in $eptv-map {
    $i: $i + 1;
    $j: 0;
    @if $e != '&' and $e != '&:before' {
      @each $e2, $ptv2 in $eptv-map {
        $j: $j + 1;
        @if $i != $j and $e2 != '&' and $e2 != '&:before' and is-superselector($e, $e2) {
          $return-map: _deep-map-merge($return-map, ($e2: $ptv));
        }
      }
    }
    $return-map: _deep-map-merge($return-map, ($e: $ptv));
  }
  @return $return-map;
}@function _fill-from-start-and-to-end($eptv-map, $total-ms) {
  $use-first-value: true;
  $ret-map: $eptv-map;
  $start-timing: 0ms;
  $end-timing: 0ms + $total-ms;

  @each $elem, $ptv in $ret-map {
    @each $p, $tv in $ptv {
      $timing-keys: _sort-list(map-keys($tv));

      @each $set in (
        (at-timing: $start-timing, from-end: false),
        (at-timing: $end-timing, from-end: true)
      ) {
        $at-timing: map-get($set, at-timing);
        $from-end: map-get($set, from-end);

        @if map-get($tv, $at-timing) == null {
          $use-key:   nth($timing-keys, if($from-end, length($timing-keys), 1));
          $use-value: map-get($tv, $use-key);
          $merge-map: ($elem: ($p: ($at-timing: $use-value)));
          $ret-map:   _deep-map-merge($ret-map, $merge-map);
        }
      }
    }
  }

  @return $ret-map;
}
@function _convert-animation-into-transition-list($animation-map) {
  $animation-map: _normalize-map-hierarchy($animation-map, eptv);
  $seperated: _kf-properties-extractor($animation-map);

  $transition-list: ();
  $m: nth($seperated, 1);
  @each $e, $ptv in $m {
    @each $p, $tv in $ptv {

      $last-t: null;
      $last-v: null;
      $i: 0;

      @each $t, $v in $tv {
        $duration: 0;
        $from: initial;
        @if $last-t != null { $duration: $t - $last-t; }
        @if $last-v != null { $from: $last-v; }

        // E.g. don't put initial state value, only worried about *transitions*
        @if $i > 0 {
          $transition-list: append($transition-list, (
            property: $p,
            selector: $e,
            start: $last-t,
            duration: $duration,
            from: $from,
            to: $v
          ));
        }

        $i: $i + 1;
        $last-t: $t;
        $last-v: $v;
      }
    }
  }

  @return _filter-function($transition-list, _is-valid-transition);
}

@function _is-valid-transition($item) {
  $duration: map-get($item, duration);
  $from: map-get($item, from);
  $to: map-get($item, to);
  @return $from != $to and $duration > 0;
}

@function _get-start-timings-from-transition-list($transition-list) {
  @return _list-uniq(_map-function($transition-list, map-get, start));
}

@function _map-transition-list-into-content-property($transition-list) {
  $message: "";
  @each $item in $transition-list {
    $selector: map-get($item, selector);
    $start: map-get($item, start);
    $duration: map-get($item, duration);
    $end: $start + $duration;
    $from: map-get($item, from);
    $to: map-get($item, to);
    $property: map-get($item, property);

    @if $from != $to and $duration > 0 {
      $append-line: "#{$selector} [#{$property}]: #{$start}::#{$from} → #{$end}::#{$to} (#{$duration})";
      @if $message == "" {
        $message: "#{$append-line}"
      } @else {
        $message: "#{$message}\a#{$append-line}"
      }
    }
  }
  @return $message;
}


@function _generate-debugger-animation($for-selector, $animation-map) {
  $animation-map: _sort-map-keys-deep($animation-map);
  $transition-list: _convert-animation-into-transition-list($animation-map);
  $start-timings: _sort-list(_get-start-timings-from-transition-list($transition-list));

  $tv-set: ();
  $so-far-transition-stack: ();
  @each $timing in $start-timings {
    $transitions-with-start-timing: _filter-function(
      $transition-list, _map-has-key-with-value, start, $timing
    );
    $so-far-transition-stack: join($so-far-transition-stack, $transitions-with-start-timing);
    $tv-set: map-merge($tv-set, (
      $timing: _map-transition-list-into-content-property($so-far-transition-stack)
    ));
  }

  $duration: _calculate-animation-length($animation-map);
  @return kf-ease(step-end, (
    _kf-duration: $duration,
    $for-selector: ('content': $tv-set)
  ));
}
@function _get-globals() {
  $default-globals: (
    isolate: null,
    infinite-loop: true,
    default-ease: linear,
    debug: false,
    visual-debug: false,
    enabled: true
  );
  $kf-globals: if(variable-exists('kf-globals') and _is-a-map($kf-globals), $kf-globals, ());
  @return map-merge($default-globals, $kf-globals);
}
@function _is-not-kf-property($v) {
  @return not (
    type-of($v) == string and
    str-slice($v, 1, 4) == _kf-
  );

}

@function _kf-properties-extractor($map) {
  @return _partition-map-by-key(
    $map,
    _is-not-kf-property
  );
}
@function _get-value-and-atf($v) {
  @if type-of($v) == list and list-separator($v) == comma {
    @return (value: nth($v, 1), animation-timing-function: nth($v, 2));
  } @else {
    @return (value: $v);
  }
}

@function _get-value-and-atf-with-lookahead($v, $lookahead-for-atf-v)  {
  @return (
    value: map-get(_get-value-and-atf($v), value),
    animation-timing-function: map-get(
      _get-value-and-atf($lookahead-for-atf-v),
      animation-timing-function
    )
  );
}

@function _convert-absolute-timings-to-percentages($times, $total-length) {
  $times: if(type-of($times) != 'list', ($times,), $times);
  @return _change-list-seperator(_map-function($times, _to-percentage, $total-length), comma);
}

@function _make-animation-sets($animation-sets, $animation-length) {
  $return-list-of-maps: ();
  @each $property, $timings-to-value in $animation-sets {
    $n: 0;
    @each $times, $value in $timings-to-value {
      $n: $n + 1;

      $map-percentage-and-property: (
        percent-list: _convert-absolute-timings-to-percentages($times, $animation-length),
        property: $property,
      );
      $map-value-and-atf:  _get-value-and-atf-with-lookahead(
        $value,
        nth(map-values($timings-to-value), if($n < length($timings-to-value), $n + 1, 1))
      );

      $push-map: map-merge($map-percentage-and-property, $map-value-and-atf);
      $return-list-of-maps: append($return-list-of-maps, $push-map);
    }
  }
  @return $return-list-of-maps;
}
@function _normalize-map-hierarchy($animation-map, $map-type: eptv) {
  @if map-get($animation-map, _kf-sleep) != null {
    @return $animation-map;
  }
  $seperated: _kf-properties-extractor($animation-map);
  $map: nth($seperated, 1);
  $prop-map: nth($seperated, 2);
  $map: _expand-implicit-selector($map);
  $already-set-kf-map-type: map-get($prop-map, _kf-map-type);
  @if map-get($prop-map, _kf-map-type) == null {
    $map: _determine-map-type($map);
  } @else {
    $map: map-merge($map, (_kf-map-type: $already-set-kf-map-type));
  }
  $map: _reorder-map-hierarchy($map, $map-type);
  $map: _expand-compound-selectors($map);
  @return map-merge(map-merge($map, $prop-map), (_kf-map-type: $map-type));
}
@function _reorder-map-hierarchy($map, $eptv-ordering) {
  @if map-get($map, _kf-sleep) { @return $map; }
  $map-type: map-get($map, _kf-map-type);
  @if $map-type == $eptv-ordering { @return $map; }

  $eptv-list: ();
  @for $i from 1 through str-length($eptv-ordering) {
    $eptv-list: append($eptv-list, str-slice($eptv-ordering, $i, $i));
  }

  // Re-order
  $return-map: ();
  @each $a, $bcd in map-remove($map, _kf-map-type) {
    @each $b, $cd in $bcd {
      @each $c, $d in $cd {
        $vals: ($a, $b, $c, $d);
        $rord: ();
        @each $letter in $eptv-list {
          $index: str-index($map-type, $letter);
          $rord: append($rord, (nth($vals, $index)));
        }
        $return-map: _deep-map-merge(
          $return-map,
          (nth($rord, 1): (nth($rord, 2): (nth($rord, 3): nth($rord,4))))
        );
      }
    }
  }

  @return map-merge($return-map, (_kf-map-type: $eptv-ordering));
}
@function _selector-property-keyify($eptv-map) {
  // Produces map like: (s-p: last-value, s-p2: last-value, s2-p: last-value )
  $r: ();
  @each $e, $ptv in $eptv-map {
    @each $p, $tv in $ptv {
      @if type-of($tv) == map {
        $last-t: nth(map-keys($tv), -1);
        $last-v: map-get($tv, $last-t);
        $r: map-merge($r, ("#{$e}-#{$p}": (last-t: $last-t, last-v: $last-v, e: $e, p: $p)));
      }
    }
  }
  @return $r;
}@mixin _at-root-keyframes($l) {
  @at-root {
    @keyframes #{$l} {
      @content;
    }
  }
}
@mixin _debugger-styles() {
  $p: 10px;
  font-size: 12px;
  content: "";
  display: block;
  background: rgba(#e8e8e8, 0.8);
  border: 1px solid #888888;
  position: fixed;
  bottom: $p;
  right: $p;
  padding: $p / 2;
  z-index: 99999999;
  white-space: pre-wrap;
}
@function kf($kf-map, $loop: null) {
  $globals:  _get-globals();
  // nop
  @if not map-get($globals, enabled) { @return (eptv-map: ()); }

  // apply pipeline fn
  $pipeline-fn: map-get($globals, pipeline-fn);
  @if $pipeline-fn != null {
    $kf-map: call($pipeline-fn, $kf-map);
  }

  $eptv-map: _normalize_map-hierarchy($kf-map);
  $total-ms: _calculate-animation-length($eptv-map);
  $seperated: _kf-properties-extractor($eptv-map);
  $eptv-map-seperated:  nth($seperated, 1);
  $eptv-map-seperated: _expand-super-selectors($eptv-map-seperated);
  $eptv-map-seperated: _fill-from-start-and-to-end($eptv-map-seperated, $total-ms);

  @return (
    animation-handle: kf-#{unique-id()},
    total-ms: $total-ms,
    eptv-map: $eptv-map-seperated,
    infinite-loop: if($loop != null, $loop, map-get($globals, infinite-loop)),
    generate-debugger-animation: map-get($kf-map, _kf-debug)
  );
}


@mixin kf($kf-map, $loop: null) {
  $kf-props:         kf($kf-map, $loop);
  $animation-handle: map-get($kf-props, animation-handle);
  $total-ms:         map-get($kf-props, total-ms);
  $eptv-map:         map-get($kf-props, eptv-map);
  $infinite-loop:    map-get($kf-props, infinite-loop);
  $debugger-enabled: map-get($kf-props, generate-debugger-animation);

  @if $debugger-enabled != null { #{$debugger-enabled} { @include _debugger-styles(); } }

  $i: 0;
  @each $selector, $animation-set in $eptv-map {
    $i: $i + 1;
    $selector-animation-name-handle: #{$animation-handle}-#{$i};
    @include _at-root-keyframes($selector-animation-name-handle) {
      $kfs: _make-animation-sets($animation-set, $total-ms);
      @each $set in $kfs {
        #{map-get($set, percent-list)} {
          #{map-get($set, property)}: map-get($set, value);
          @if map-get($set, animation-timing-function) != null {
            animation-timing-function: map-get($set, animation-timing-function);
          }
        }
      }
    }

    #{$selector} {
      animation-fill-mode: forwards;
      animation-iteration-count: if($infinite-loop, infinite, 1);
      animation-name: $selector-animation-name-handle;
      animation-duration: $total-ms;
    }
  }
}
@function kf-chain($chained-maps...) {
  $chained-maps: _map-function($chained-maps, _normalize-map-hierarchy, tepv);
  $new-duration: _list-sum(_map-function($chained-maps, _calculate-animation-length));

  $return-map: ();
  $last-timing: 0ms;
  $i: 0;
  @each $m in $chained-maps {
    $i: $i + 1;
    @if map-has-key($m, _kf-sleep) {
      $last-timing: $last-timing + map-get($m, _kf-sleep);
      @if length($chained-maps) == $i {
        $return-map: map-merge($return-map, (_kf-duration: $last-timing));
      }
    } @else {
      $new-map: ();
      $seperated: _kf-properties-extractor($m);
      $anim-map: nth($seperated, 1);
      @each $t, $epv in $anim-map {
        $timing: $last-timing + $t;
        $new-map: map-merge($new-map, ($timing: $epv))
      }
      $return-map: map-merge($return-map, $new-map);
      $last-timing: $last-timing + _calculate-animation-length(map-merge($m, (_kf-map-type: tepv))) + 1ms;
    }
  }

  @return map-merge($return-map, (_kf-map-type: tepv, _kf-duration: $new-duration));
}

@mixin kf-chain($m...) {
  @include kf(kf-chain($m...));
}@function kf-debug($args...) {
  $animation-map: nth($args, 1);
  $called-from-mixin: nth($args, 2);

  @if $called-from-mixin != called-from-mixin {
    @warn "Unsupported feature warning:";
    @warn "_kf-debug is currently only support when used as a top-level mixin";
    @warn "_kf-debug *may* work when used nested as a function but this is not officially support";
  }

  $debug-selector: "&:before";
  $animation-map: kf-parallel(
    kf-ease(step-end, _generate-debugger-animation($debug-selector, $animation-map)),
    $animation-map
  );
  @return map-merge($animation-map, (_kf-debug: $debug-selector ));
}

@mixin kf-debug($animation-map) {
  @include kf(
    kf-debug($animation-map, called-from-mixin)
  );
}
@function kf-ease($easing, $animation-map) {
  $animation-map: _normalize-map-hierarchy($animation-map);

  $seperated: _kf-properties-extractor($animation-map);
  $anim-map: nth($seperated, 1);
  $prop-map: nth($seperated, 2);

  $return-map: ();
  @each $s, $ptv in $anim-map {
    $ptv-m: ();
    @each $p, $tv in $ptv {
      $tv-m: ();
      @each $t, $v in $tv {
        $new-v: $v;
        @if type-of($v) != list {
          $new-v: ($v, $easing);
        }
        $tv-m: map-merge($tv-m, ($t: $new-v));
      }
      $ptv-m: map-merge($ptv-m, ($p: $tv-m));
    }
    $return-map: map-merge($return-map, ($s: $ptv-m));
  }

  @return map-merge($return-map, $prop-map);
}

@mixin kf-ease($m...) {
  @include kf(kf-ease($m...));
}
@function kf-lag($duration, $animation-map) {
  @return kf-chain(
    $animation-map,
    kf-sleep($duration)
  );
}

@mixin kf-lag($m...) {
  @include kf(kf-lag($m...));
}
@function kf-lead($duration, $animation-map) {
  @return kf-chain(
    kf-sleep($duration),
    $animation-map,
  );
}

@mixin kf-lead($m...) {
  @include kf(kf-lead($m...));
}
@function kf-loop($args...) {
  @if length($args) == 1 {
    $animation-map: nth($args, 1);
    $animation-map: _normalize-map-hierarchy($animation-map);
    @return map-merge($animation-map, (_kf-infinite-loop: true));
  } @else if length($args) == 2 {
    $times: nth($args, 1);
    $animation-map: nth($args, 2);
    $animation-map: _normalize-map-hierarchy($animation-map);
    $chain: ();
    @for $i from 1 through $times {
      $chain: append($chain, $animation-map);
    }
    @return kf-chain($chain...);
  } @else {
    @debug "Cannot use kf-loop must be used with 1-2 parameters";
    @return ();
  }
}

@mixin kf-loop($m...) {
  @include kf(kf-loop($m...));
}

@function kf-mirror($map) {
  $map: _normalize-map-hierarchy($map);
  @return kf-chain($map, kf-reverse($map));
}

@mixin kf-mirror($m...) {
  @include kf(kf-mirror($m...));
}
@function kf-parallel($m...) {
  $m: _map-function($m, _normalize-map-hierarchy);
  $seperated-list: _map-function($m, _kf-properties-extractor);
  $r: (_kf-map-type: eptv);

  @each $n in $seperated-list {
    $r: _deep-map-merge($r, nth($n, 1));
    $kf-duration: map-get(nth($n, 2), _kf-duration);
    @if $kf-duration != null {
      $old-duration: map-get($r, _kf-duration);
      $new-duration: if($old-duration != null, max($old-duration, $kf-duration), $kf-duration);
      $r: map-merge($r, (_kf-duration: $new-duration));
    }
  }

  @return $r;
}

@mixin kf-parallel($m...) {
  @include kf(kf-parallel($m...));
}
@function kf-reverse($animation-map) {
  $animation-map: _normalize-map-hierarchy($animation-map, tepv);
  $length: _calculate-animation-length($animation-map);

  $seperated: _kf-properties-extractor($animation-map);
  $anim-map: nth($seperated, 1);
  $prop-map: nth($seperated, 2);

  $return-map: ();
  @each $m, $epv in $anim-map {
    $m: abs($m + -$length);
    $return-map: map-merge($return-map, ($m: $epv));
  }

  @return map-merge($return-map, $prop-map);
}

@mixin kf-reverse($m...) {
  @include kf(kf-reverse($m...));
}
@function kf-sleep($duration) {
  @return (_kf-sleep: $duration);
}

@mixin kf-sleep($duration) {
  @include kf-sleep($duration);
}
@function kf-sleep($duration) {
  @return (_kf-sleep: $duration);
}

@mixin kf-sleep($duration) {
  @include kf-sleep($duration);
}
@function kf-stagger($stagger-duration, $list-of-animations...) {
  $i: 0;
  $return-animation: null;

  @each $animation in $list-of-animations {
    @if $i == 0 {
      $return-animation: $animation;
    } @else {
      $old-duration: _calculate_animation_length($return-animation);
      $return-animation: kf-parallel(
        $return-animation,
        kf-lead($old-duration + $stagger-duration, $animation)
      );
    }
    $i: $i + 1;
  }

  @return $return-animation;
}

@mixin kf-stagger($m...) {
  @include kf(kf-stagger($m...));
}
@function kf-stretch($multiplier-or-duration, $animation-map) {
  $animation-map: _normalize-map-hierarchy($animation-map, tepv);

  $multiplier: 1;
  $unit: unit($multiplier-or-duration);
  $current-duration: _calculate_animation_length($animation-map);
  @if $unit == "" {
    $multiplier: $multiplier-or-duration;
  } @else if $unit == "ms" or $unit == "s" {
    $multiplier: $multiplier-or-duration / $current-duration;
  } @else {
    @warn Cannot use kf-stretch on unit '#{$unit}';
  }
  $new-total-duration: $current-duration * $multiplier;

  $seperated: _kf-properties-extractor($animation-map);
  $anim-map: nth($seperated, 1);
  $prop-map: nth($seperated, 2);

  $return-map: ();
  @each $t, $epv in $anim-map {
    $return-map: map-merge($return-map, (($t * $multiplier): $epv));
  }

  $prop-map: map-merge($prop-map, (_kf-duration: $new-total-duration));
  @return map-merge(
    $return-map,
    $prop-map
  );
}

@mixin kf-stretch($m...) {
  @include kf(kf-stretch($m...));
}
@function kf-timeline($kf-timeline-map) {
  @warn "Unsupported feature warning:";
  @warn "kf-timeline is not fully completed - please do not use!";

  $kf-parallel-list: ();
  @each $timing, $place-map in $kf-timeline-map {
    $sleep-amount: $timing;
    $kf-chain-map: kf-chain(kf-sleep($sleep-amount), $place-map);
    $kf-parallel-list: append($kf-parallel-list, $kf-chain-map);
  }
  @return kf-parallel($kf-parallel-list...);
}

@mixin kf-timeline($kf-timeline-map) {
  @include kf(kf-timeline($kf-timeline-map));
}
`;
