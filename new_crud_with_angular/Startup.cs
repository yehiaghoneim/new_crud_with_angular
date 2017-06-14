using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(new_crud_with_angular.Startup))]
namespace new_crud_with_angular
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
