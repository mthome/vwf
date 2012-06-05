"use strict";

// Copyright 2012 United States Government, as represented by the Secretary of Defense, Under
// Secretary of Defense (Personnel & Readiness).
// 
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
// in compliance with the License. You may obtain a copy of the License at
// 
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software distributed under the License
// is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing permissions and limitations under
// the License.

/// vwf/configuration maintains the runtime configuration settings. A set of fixed factory defaults
/// cascade into instance settings and appear as the active configuration.
/// 
/// @name vwf.configuration
/// @namespace

define( function() {

    var configuration = Object.create( Object.prototype, {

        // -- factory ------------------------------------------------------------------------------

        /// Return the factory default settings. The factory settings are constant, and this
        /// property returns a copy to prevent modifications. Factory settings are paritioned by
        /// environment with default settings that apply to all environments and additional settings
        /// for specific environments, typically "production", "development", and "testing". For
        /// example:
        ///
        ///   {
        ///     default: { environment: "development", alpha: 1, beta: 2, gamma: 3 },
        ///     production: { alpha: 101 },
        ///     development: { beta: 222, gamma: 3000 },
        ///     testing: { },
        ///   }
        /// 
        /// @name vwf.configuration#factory
        /// @field

        factory: {

            get: function() {
                return jQuery.extend( true, {}, factory );
            }

        },

        // -- instance -----------------------------------------------------------------------------

        /// Set or get the instance settings. The instance settings apply to the active environment
        /// and override the factory settings. For example:
        ///
        ///   {
        ///     beta: 222,
        ///     gamma: 3000,
        ///     delta: false,
        ///   }
        /// 
        /// @name vwf.configuration#instance
        /// @field

        instance: {

            set: function( value ) {
                instance = typeof value == "object" && value != null ? value : {};
                update();
            },

            get: function() {
                return instance;
            }

        },

        // -- active -------------------------------------------------------------------------------

        /// Get the computed configuration for the environment. The active configuration is the
        /// result of a cascade of the factory default settings, factory settings for the active
        /// environment, and the instance settings. Changes to the configuration update this object
        /// in place without invalidating references to it.
        /// 
        /// @name vwf.configuration#active
        /// @field

        active: {

            get: function() {
                return active;
            }

        },

        // -- environment --------------------------------------------------------------------------

        /// Get the name of the active envionment. environment returns the same value as
        /// active.environment.
        /// 
        /// @name vwf.configuration#environment
        /// @field

        environment: {

            get: function() {
                return environment;
            }

        },

    } );

    // == Private functions ========================================================================

    // -- update -----------------------------------------------------------------------------------

    /// Update the cascade.
    /// 
    /// @name vwf.configuration#update
    /// @function

    function update() {

        // Determine the environment.

        environment = instance.environment || factory.default.environment;

        // Clear active so that we may update it in place. This lets us preserve any existing
        // references.

        Object.keys( active ).forEach( function( key ) {
            delete active[key];
        } );

        // Merge the factory defaults and the instance settings into the active configuration.

        jQuery.extend( true, active, factory.default, factory[environment] || {}, instance );

    }

    // == Private variables ========================================================================

    // -- factory ----------------------------------------------------------------------------------

    /// Factory default configuration.
    /// 
    /// @name vwf.configuration#factory
    /// @field
    /// @private

    var factory = {

        // Default configuration for all environments.

        default: {
            environment: "development",
        },

        // Production configuration.

        production: {
            "log-level": "warn",  // TODO: use in logger
        },

        // Development configuration.

        development: {
            "log-level": "info",  // TODO: use in logger
        },

        // Testing configuration.

        testing: {
            "log-level": "warn",  // TODO: use in logger
        },

    };

    // -- instance ---------------------------------------------------------------------------------

    /// Configuration overrides for the current instance.
    /// 
    /// @name vwf.configuration#instance
    /// @field
    /// @private

    var instance = {};

    // -- active -----------------------------------------------------------------------------------

    /// The computed configuration.
    /// 
    /// @name vwf.configuration#active
    /// @field
    /// @private

    var active = {};

    // -- environment ------------------------------------------------------------------------------

    /// Name of the active environment. Equivalent to active.environment.
    /// 
    /// @name vwf.configuration#environment
    /// @field
    /// @private

    var environment;

    // The define() result.

    return configuration;

} );
