<?php
/**
 * 
 * Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 * 
 */

$pfxmdl = <<<DOCS
<?xml version="1.0" encoding="UTF-8" ?>
<!-- An XML needs a root node with any effective name,  and root node could be with namespace declaring -->
<root xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xsi:noNamespaceSchemaLocation="schema1.xsd" 
      xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <description>XML data model for layout</description>
	<version>0.0.1</version>
	<category>XML data model</category>
	<author>W3plan Technologies</author>
	<company>W3plan Technologies</company>
	<copyright>Copyright 2015-2016 W3plan Technologies, http://w3plan.net</copyright>
	<licenses>GNU GPLv3 &lt;http://www.gnu.org/licenses/gpl.html&gt;</licenses>
    <expiration>0</expiration>
	<pfDataSet>
		<pfSet1>
			<!-- Data part would be used for templates  -->
			<headerClr>#ccc</headerClr>
			<nav__pfcrc>float: left; width: 100%; background: #333;</nav__pfcrc>
			<nav__pfcrc>2064493575</nav__pfcrc>
			<startTime__pfenc>XgRcJiwaNixmdmoQP1IaFT4vKwtcSFxiYG1HXEJ8VSh8eEodAz9jVGI+KQAXEXVVBgMVOXNFAh0KNj9RfwFOfm4TfhBkQURBNxAWS1hQbmkzBV0ANTdbMQEFcA4WOipAU05nU2lfAA91QXIxETN1AUoMZncyLjowFzdpBjICPScZBAMLIhx2AEtoAXEHCRx2CD4zC3QAaCdEQyU1CiAyLEgGCwI4Jgg9KB4bEURrVgF6HEIAckpkHh4cYmVxZkosRH4FdVUkU2NiZlFmRnpkaF4KFmIIdgolYGt1dmYACVIAZVxHBXNBdkBGRiZfBzpBfwgiUVBxXhdLfikQcQJoeXtUAHVpQ3xwemFoUzgWWlFPdQJLS0pBdWVkR1xFfFBafHg4TlB9NUNhCGNWRgw/BTcAFSAiWVU8Hwc2ESBcBTgVTwQ2ZEFMEmRVUBUHWyAuDwUXVmNrR29KGFYPBjoRMSw6Z1NgXwAJdUFyL1VzYBZII2Z2Rn9nY1N9BkRlQVV8R1RFLHQLdFVLaAhxBgkcdghtYE50ARlxU0dEc1VhYRdDU14FTnApd3RKHlUEdkEDNxxDcnJLEFJKCSMwIAAbLAQjQCRDVU43JzkCNx0sL39cXxZiAXYOIzYtJCEgY1AaV3dLTRBkShFSMFN5ORFKVHgIexJHeksBO2NtcQ==</startTime__pfenc>
		</pfSet1>
		<pfSet2>
			<comment1>$comment1</comment1>
			<comment2>$comment2</comment2>			<caption__pfenc>djBhBH1BbjFmdmo3LkEaAE90dh0YDgErPj0WC1drUho4OQkOBmh0Vj08IxZTWmAtIx8ZIDdSAGkCLH9GfU0DKXIEfTcgAABSJAwWS1hoKjkeF1sHcXxFc1cyWhNGexxAU0YNAjUbXWhiQy0pVXNgcg8GbWFEamRgU3x3ACNTQn5FVEQvZQlhCl4qVXoReQkBfBx3S2FFMDEPVVNxDDB2Z1YWDwVOcVshMhMEWFNhQ1JmC0EqIgomHhtYPjA=</caption__pfenc>
			<image>
				<src__pfcrc>/images/pfm/karina_storm1.jpg</src__pfcrc>
				<src__pfcrc>1856105291</src__pfcrc>
				<altSrc__pfvld>http://media.eurekalert.org/multimedia_prod/pub/web/77823_web.jpg</altSrc__pfvld>
				<altSrc__pfvld>
					<type>urlstr</type>
				</altSrc__pfvld>
			</image>
			<imageType__pfenc>HURwYGpBPislYWhRbgErRFh2Y1xLEBQgd2ZQS0AaR1hpb0hZCD0jAXd4dEFEK3VUckhCfCYZVXxZcH9GDhxZfHIEfyYoFVEFZEcGPQ==</imageType__pfenc>
			<grid>
				<gridRow1>
					<city>New York</city>
					<name>Jonesy Band</name>
					<age__pfvld>16</age__pfvld>
					<age__pfvld>
						<type>intnum</type>
						<constraint>
							<minExc>10</minExc>
							<maxExc>90</maxExc>
						</constraint>
					</age__pfvld>
					<education>No College</education>
				</gridRow1>
				<gridRow2__pfenc>HUZwYGpBOis3PX9ReRZbIE90dktLSCcvOzcDCR18UFh8eDlOUH8oBz8vY1ZETWMnZ19Aa2RFfzgZO39GfXIKNXIEf3dzMFEFZANUHE0KeX9EMBdWZH1Ac1YyHVNRLT0QAhc2CD8UFn9iVnEGVXNgFkhTBDYXPiA1AitiU2clEyYYHhtLYwthDyo=
				</gridRow2__pfenc>
				<gridRow3>
					<city>Los Angeles</city>
					<name>James Franco</name>
					<age__pfvld>28</age__pfvld>
					<age__pfvld>
						<type>intnum</type>
						<constraint>
							<minExc>6</minExc>
							<maxExc>80</maxExc>
						</constraint>
					</age__pfvld>
					<education>College</education>
				</gridRow3>
				<gridRow4>
					<city>San Diego</city>
					<name>Ellen Compell</name>
					<age__pfvld>20</age__pfvld>
					<age__pfvld>
						<type>intnum</type>
					</age__pfvld>
					<education>Some College</education>
				</gridRow4>
			</grid>
		</pfSet2>
		<pfSet3>
			<caption_cn__pfenc>HTQFYBo2fHoGYR9WbgoqRCgCYytMXyUCd2xVSzdhR1JhbzsqRwhzQxB7Y1xGPDUUMAxVC2NSCh1OAxhRCA9OdW8TdBRkNkESbyEWOFAAbh9BVAsncXZNZ1BUfVdGcW5AIENnJGRfcXV1SwBiNXR1Cz5Ee3xEf2YVQn5iUhQUAmtENFIrZhwGfUtifXFxfhx9em0QPXR3bHEjSER4JmEWbENZXVMqe04XcF9RA1MRRRYGAFR7YF0WQ118aHAWYld5IGlwaEMlMHRqYEQGQWZ5HksmAnV9ZBxYdXwHYHFyDFJzalxMdnM2AkBNQW44Al0heB0KclB7XRc8fn93BRd0ch00BGBhS3wDBWEfV25xUERSdmMrTV8mf3cVI0s3YEcram9DWEcIf0MTeWNcMw==</caption_cn__pfenc> 			
			<image_cn>
				<src__pfcrc>/images/pfm/karina_storm2.jpg</src__pfcrc>
				<src__pfcrc>687968667</src__pfcrc>
				<altSrc__pfvld>http://media.eurekalert.org/multimedia_prod/pub/web/77824_web.jpg</altSrc__pfvld>
				<altSrc__pfvld>
					<type>urlstr</type>
				</altSrc__pfvld>
			</image_cn>
			<imageType_cn__pfenc>HURwYGpBPislYR9VbnJYRCgFYytMXyYEd2wkS0BrR1gab0hbR390DCItYyFATRFWZy8zaxNCFxsoZ2IyaAtZaWV1aGBxVkYFPBJWHk19fX82QRcmF2swY0Eze0RbDnxXU1NwInVIA2hiQTIpF2QVBV8gc2E0GXARQ2sFInJONmtFQ1JcEhx2CEtoCiBdLRwBDm0TSXRwG3EkRUQDJmFrE0NTXFNeBw==</imageType_cn__pfenc>
			<grid_cn>
				<gridRow1>
					<city>纽约</city>
					<name>Jonesy Band</name>
					<age__pfvld>16</age__pfvld>
					<age__pfvld>
						<type>intnum</type>
						<constraint>
							<minExc>10</minExc>
							<maxExc>90</maxExc>
						</constraint>
					</age__pfvld>
					<education>大学以下</education>
				</gridRow1>
				<gridRow2>
					<city>芝加哥</city>
					<name>Mary Kay</name>
					<age__pfvld>35</age__pfvld>
					<age__pfvld>
						<type>intnum</type>
						<constraint>
							<minExc>15</minExc>
							<maxExc>100</maxExc>
						</constraint>
					</age__pfvld>
					<education>研究生</education>
				</gridRow2>
				<gridRow3___pfenc>HUZwYGpBOis3PX9ReRZbIE90dktLSEECZHEgWldgIE8cfF9SJmh+X3cPcUFPLnUkdEhCfHNFcXxZcDQVIFxOfmUTfhNkQUQSZFB5GAVdOH9FQXQWNSAWOUFDCkRRC3xXUxclBHVIAWhjMmd1QHNoFkgiZnZEPzEhFS8zCDgYVXxFVEQvdAt0HVxoHREBbnhwHQllXBQHfRUlVSB3QHZhcFEl</gridRow3___pfenc>
				<gridRow4>
					<city>圣地亚哥</city>
					<name>Ellen Compell</name>
					<age__pfvld>20</age__pfvld>
					<age__pfvld>
						<type>intnum</type>
					</age__pfvld>
					<education>未完成大学</education>
				</gridRow4>
			</grid_cn>
		</pfSet3>
	</pfDataSet>
</root>
DOCS;
?>
