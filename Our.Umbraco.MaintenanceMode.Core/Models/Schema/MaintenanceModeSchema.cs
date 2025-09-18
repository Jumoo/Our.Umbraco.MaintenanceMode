using System;
using System.ComponentModel.DataAnnotations;
using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Our.Umbraco.MaintenanceMode.Models.Schema
{
    [TableName(TableName)]
    [PrimaryKey(nameof(Id), AutoIncrement = false)] 
    [ExplicitColumns]
    public class MaintenanceModeSchema
    {
        public const string TableName = "MaintenanceModeConfig";

        [Column(nameof(Id))]
        [PrimaryKeyColumn(AutoIncrement = false)]
        public int Id { get; set; }

        [Column(nameof(Value))]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        public string Value { get; set; }
    }
}
